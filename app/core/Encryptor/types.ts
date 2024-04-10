import { Json } from '@metamask/utils';
import type { KeyDerivationOptions } from '@metamask/browser-passworder';

/** Key derivation function options. */
export type { KeyDerivationOptions };

/**
 * The result of an encryption operation.
 * @interface EncryptionResult
 * @property cipher - The encrypted data.
 * @property iv - The initialization vector used in the encryption process.
 * @property [salt] - The salt used in the encryption process, if applicable.
 * @property [lib] - The library or algorithm used for encryption, if applicable.
 * @property [keyMetadata] - Metadata about the key derivation, if key derivation was used.
 */
export interface EncryptionResult {
  // NOTE: We do redefine our own type since some fields are named differently than the one
  // defined in @metamask/browser-passworder. Plus, we also have additional logic here.
  cipher: string; // Named `data` in @metamask/browser-passworder
  iv: string;
  salt?: string;
  lib?: string; // Specific to the mobile version
  keyMetadata?: KeyDerivationOptions;
}

/**
 * Key used by the encryptor.
 * @interface EncryptionKey
 * @property key - The key value.
 * @property lib - The library or algorithm used for generating the key.
 * @property keyMetadata - Metadata about the key derivation, if key derivation was used.
 */
export interface EncryptionKey {
  key: string;
  lib: string;
  keyMetadata: KeyDerivationOptions;
}

/**
 * Defines the structure for a generic encryption utility.
 * This utility provides methods for encrypting and decrypting objects
 * using a specified password. It may also include an optional method
 * for checking if an encrypted vault is up to date with the desired
 * encryption algorithm and parameters.
 */
export interface GenericEncryptor<Data = Json> {
  /**
   * Encrypts the given data with the given password.
   *
   * @param password - The password to encrypt with.
   * @param data - The data to encrypt.
   * @returns The encrypted string.
   */
  encrypt: (password: string, data: Data) => Promise<string>;
  /**
   * Decrypts the given encrypted string with the given password.
   *
   * @param password - The password to decrypt with.
   * @param text - The encrypted string to decrypt.
   * @returns The decrypted data.
   */
  decrypt: (password: string, text: string) => Promise<unknown>;
  /**
   * Optional vault migration helper. Checks if the provided vault is up to date
   * with the desired encryption algorithm.
   *
   * @param vault - The encrypted string to check.
   * @param targetDerivationParams - The desired target derivation params.
   * @returns The updated encrypted string.
   */
  isVaultUpdated?: (
    vault: string,
    targetDerivationParams?: KeyDerivationOptions,
  ) => boolean;
}

/**
 * An encryptor interface that supports encrypting and decrypting
 * serializable data with a password, and exporting and importing keys.
 */
export type WithKeyEncryptor<Key, Data> = GenericEncryptor<Data> & {
  /**
   * Encrypts the given object with the given encryption key.
   *
   * @param key - The encryption key to encrypt with.
   * @param object - The object to encrypt.
   * @returns The encryption result.
   */
  encryptWithKey: (key: Key, data: Data) => Promise<EncryptionResult>;
  /**
   * Decrypts the given encrypted string with the given encryption key.
   *
   * @param key - The encryption key to decrypt with.
   * @param encryptedString - The encrypted string to decrypt.
   * @returns The decrypted object.
   */
  decryptWithKey: (key: Key, payload: EncryptionResult) => Promise<unknown>;
};
