import { createSelector } from 'reselect';
import { AccountsControllerState } from '@metamask/accounts-controller';
import { RootState } from '../reducers';
import Engine from '../core/Engine';
import { toChecksumAddress } from 'ethereumjs-util';

const selectAccountsControllerState = (state: RootState) =>
  state.engine.backgroundState.AccountsController;

export const selectSelectedInternalAccount = createSelector(
  selectAccountsControllerState,
  (accountsControllerState: AccountsControllerState) => {
    const accountId = accountsControllerState.internalAccounts.selectedAccount;
    return accountsControllerState.internalAccounts.accounts[accountId];
  },
);

export const selectSelectedInternalAccountAddressAsChecksum = createSelector(
  selectAccountsControllerState,
  (accountsControllerState: AccountsControllerState) => {
    console.log(
      'accounts/ engine PreferencesController.state.identities',
      JSON.stringify(
        Engine.context.PreferencesController.state.identities,
        null,
        2,
      ),
    );
    console.log(
      'accounts/ engine AccountsController',
      JSON.stringify(Engine.context.AccountsController, null, 2),
    );
    console.log(
      'accounts/ selectAccountsControllerState',
      JSON.stringify(selectAccountsControllerState, null, 2),
    );
    const accountId = accountsControllerState.internalAccounts.selectedAccount;
    const selectedAddress =
      accountsControllerState.internalAccounts.accounts[accountId].address;
    return toChecksumAddress(selectedAddress);
  },
);
