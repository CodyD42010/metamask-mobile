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
    // console.log(
    //   'accounts/ engine AccountsController',
    //   JSON.stringify(Engine.context.AccountsController, null, 2),
    // );
    // console.log(
    //   'accounts/ selectSelectedInternalAccount accountsControllerState',
    //   JSON.stringify(accountsControllerState, null, 2),
    // );
    const accountId = accountsControllerState.internalAccounts.selectedAccount;
    // console.log('accounts/ selectSelectedInternalAccount accountId', accountId);
    // console.log(
    //   'accounts/ selectSelectedInternalAccount account',
    //   JSON.stringify(
    //     accountsControllerState.internalAccounts.accounts[accountId],
    //     null,
    //     2,
    //   ),
    // );
    return accountsControllerState.internalAccounts.accounts[accountId];
  },
);

export const selectSelectedInternalAccountAddressAsChecksum = createSelector(
  selectAccountsControllerState,
  (accountsControllerState: AccountsControllerState) => {
    // console.log(
    //   'accounts/ engine PreferencesController.state.identities',
    //   JSON.stringify(
    //     Engine.context.PreferencesController.state.identities,
    //     null,
    //     2,
    //   ),
    // );
    // console.log(
    //   'accounts/ engine AccountsController',
    //   JSON.stringify(Engine.context.AccountsController, null, 2),
    // );
    // console.log(
    //   'accounts/ selectAccountsControllerState',
    //   JSON.stringify(accountsControllerState, null, 2),
    // );
    const accountId = accountsControllerState.internalAccounts.selectedAccount;
    const selectedAddress =
      accountsControllerState.internalAccounts.accounts[accountId].address;
    return toChecksumAddress(selectedAddress);
  },
);
