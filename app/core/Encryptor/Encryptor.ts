import { NativeModules } from 'react-native';
import { hasProperty, isPlainObject, Json } from '@metamask/utils';
import {
  SALT_BYTES_COUNT,
  SHA256_DIGEST_LENGTH,
  ENCRYPTION_LIBRARY,
  LEGACY_DERIVATION_OPTIONS,
  KeyDerivationIteration,
} from './constants';
import type {
  WithKeyEncryptor,
  EncryptionKey,
  EncryptionResult,
  KeyDerivationOptions,
} from './types';

const Aes = NativeModules.Aes;
const AesForked = NativeModules.AesForked;

/**
 * Checks if the provided object is a `KeyDerivationOptions`.
 *
 * @param derivationOptions - The object to check.
 * @returns Whether or not the object is a `KeyDerivationOptions`.
 */
const isKeyDerivationOptions = (
  derivationOptions: unknown,
): derivationOptions is KeyDerivationOptions =>
  isPlainObject(derivationOptions) &&
  hasProperty(derivationOptions, 'algorithm') &&
  hasProperty(derivationOptions, 'params');

/**
 * The Encryptor class provides methods for encrypting and
 * decrypting data objects using AES encryption with native libraries.
 * It supports generating a salt, deriving an encryption key from a
 * password and salt, and performing the encryption and decryption processes.
 */
class Encryptor implements WithKeyEncryptor<EncryptionKey, Json> {
  /**
   * The key derivation parameters used for encryption and decryption operations.
   * These parameters include the algorithm and its specific parameters, for example, number of iterations for key derivation.
   * They are set during the construction of the Encryptor instance and used for generating encryption keys.
   *
   * @property derivationParams - The key derivation options.
   */
  private keyDerivationOptions: KeyDerivationOptions;

  /**
   * Constructs an instance of the Encryptor class.
   *
   * @param params - An object containing key derivation parameters.
   * @param params.keyDerivationOptions - The key derivation options to use for encryption and decryption operations.
   * @throws Error if the provided iterations in `keyDerivationOptions` do not meet the minimum required.
   */
  constructor({
    keyDerivationOptions,
  }: {
    keyDerivationOptions: KeyDerivationOptions;
  }) {
    this.keyDerivationOptions = keyDerivationOptions;
  }

  /**
   * Generates a random base64-encoded salt string.
   * @param size - The number of bytes for the salt. Defaults to `constant.SALT_BYTES_COUNT`.
   * @returns The base64-encoded salt string.
   */
  private generateSalt = (size = SALT_BYTES_COUNT) => {
    const view = new Uint8Array(size);
    // @ts-expect-error - globalThis is not recognized by TypeScript
    global.crypto.getRandomValues(view);

    // From: https://github.com/MetaMask/browser-passworder/blob/main/src/index.ts#L418
    // Uint8Array is a fixed length array and thus does not have methods like pop, etc
    // so TypeScript complains about casting it to an array. Array.from() works here for
    // getting the proper type, but it results in a functional difference. In order to
    // cast, you have to first cast view to unknown then cast the unknown value to number[]
    // TypeScript ftw: double opt in to write potentially type-mismatched code.
    return btoa(String.fromCharCode.apply(null, view as unknown as number[]));
  };

  /**
   * Generates a random IV.
   *
   * @param size - The number of bytes for the IV.
   * @returns The generated IV.
   */
  private generateIV = async (size: number): Promise<unknown> =>
    // Naming isn't perfect here, but this is how the library generates random IV (and encodes it the right way)
    // See: https://www.npmjs.com/package/react-native-aes-crypto#example
    await Aes.randomKey(size);

  /**
   * Generate an encryption key from a password and random salt, specifying
   * key derivation options.
   *
   * @param password - The password to use to generate key.
   * @param salt - The salt string to use in key derivation.
   * @param opts - The options to use for key derivation.
   * @property [lib] - The library or algorithm used for encryption. Defaults to `ENCRYPTION_LIBRARY.original`.
   * @returns An EncryptionKey for encryption and decryption.
   */
  keyFromPassword = async (
    password: string,
    salt: string,
    opts: KeyDerivationOptions,
    lib = ENCRYPTION_LIBRARY.original,
  ): Promise<EncryptionKey> => {
    const key =
      lib === ENCRYPTION_LIBRARY.original
        ? await Aes.pbkdf2(
            password,
            salt,
            opts.params.iterations,
            SHA256_DIGEST_LENGTH,
          )
        : await AesForked.pbkdf2(password, salt);

    return {
      key,
      keyMetadata: opts,
      lib,
    };
  };

  /**
   * Encrypts a text string using the provided key.
   *
   * @param key - The encryption key to encrypt with.
   * @param data - The data to encrypt.
   * @returns A promise that resolves to an object containing the cipher text and initialization vector (IV).
   */
  encryptWithKey = async (
    key: EncryptionKey,
    data: Json,
  ): Promise<EncryptionResult> => {
    const iv = await this.generateIV(16);

    return Aes.encrypt(data, key, iv).then((cipher: string) => ({
      cipher,
      iv,
      keyMetadata: key.keyMetadata,
      lib: key.lib,
    }));
  };

  /**
   * Decrypts the given encrypted string with the given encryption key.
   *
   * @param key - The encryption key to decrypt with.
   * @param payload - The encrypted payload to decrypt.
   * @returns The decrypted object.
   */
  decryptWithKey = async (
    key: EncryptionKey,
    payload: EncryptionResult,
  ): Promise<unknown> => {
    // TODO: Check for key and payload compatiblity?
    const text =
      payload.lib === ENCRYPTION_LIBRARY.original
        ? await Aes.decrypt(payload.cipher, key, payload.iv)
        : await AesForked.decrypt(payload.cipher, key, payload.iv);

    return JSON.parse(text);
  };

  /**
   * Asynchronously encrypts a given object using AES encryption.
   * The encryption process involves generating a salt, deriving a key from the provided password and salt,
   * and then using the key to encrypt the object. The result includes the encrypted data, the salt used,
   * and the library version ('original' in this case).
   *
   * @param password - The password used for generating the encryption key.
   * @param data - The data object to encrypt. It can be of any type, as it will be stringified during the encryption process.
   * @returns A promise that resolves to a string. The string is a JSON representation of an object containing the encrypted data, the salt used for encryption, and the library version.
   */
  encrypt = async (password: string, data: Json): Promise<string> => {
    const salt = this.generateSalt(16);
    const key = await this.keyFromPassword(
      password,
      salt,
      this.keyDerivationOptions,
      ENCRYPTION_LIBRARY.original,
    );

    // NOTE: When re-encrypting, we always use the original library and the KDF parameters from
    // the encryptor itself. This makes sure we always re-encrypt with the "latest" and "best"
    // setup possible.
    const result = await this.encryptWithKey(key, JSON.stringify(data));
    result.lib = key.lib; // Use the same library than the one used for key generation!
    result.salt = salt;
    result.keyMetadata = key.keyMetadata;
    return JSON.stringify(result);
  };

  /**
   * Decrypts an encrypted JS object (as a JSON string)
   * using a password (and AES decryption with native libraries)
   *
   * @param password - Password used for decryption
   * @param text - String to decrypt
   * @returns - Promise resolving to decrypted data object
   */
  decrypt = async (password: string, text: string): Promise<unknown> => {
    const payload = JSON.parse(text);

    // NOTE: We use metadata coming from the payload itself as the encryption
    // scheme/parameters could be different:
    // - The encryption library might be different (forked vs original)
    // - The KDF parameters could be:
    //   * the legacy one (if not present in the payload)
    //   * use a different number of iterations for the KDF
    const key = await this.keyFromPassword(
      password,
      payload.salt,
      payload.keyMetadata ?? LEGACY_DERIVATION_OPTIONS,
      payload.lib,
    );

    return await this.decryptWithKey(key, payload);
  };

  /**
   * Checks if the provided vault is an updated encryption format.
   *
   * @param vault - The vault to check.
   * @param targetDerivationParams - The options to use for key derivation.
   * @returns Whether or not the vault is an updated encryption format.
   */
  isVaultUpdated = (
    vault: string,
    targetDerivationParams = this.keyDerivationOptions,
  ): boolean => {
    const { keyMetadata } = JSON.parse(vault);

    return (
      isKeyDerivationOptions(keyMetadata) &&
      keyMetadata.algorithm === targetDerivationParams.algorithm &&
      keyMetadata.params.iterations === targetDerivationParams.params.iterations
    );
  };
}

// eslint-disable-next-line import/prefer-default-export
export { Encryptor };
