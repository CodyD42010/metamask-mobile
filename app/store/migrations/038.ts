import { isObject, hasProperty } from '@metamask/utils';
import { captureException } from '@sentry/react-native';

export default function migrate(state: unknown) {
  if (!isObject(state)) {
    captureException(
      new Error(`Migration 36: Invalid root state: '${typeof state}'`),
    );
    return state;
  }

  if (!isObject(state.engine)) {
    captureException(
      new Error(
        `Migration 36: Invalid root engine state: '${typeof state.engine}'`,
      ),
    );
    return state;
  }

  if (!isObject(state.engine.backgroundState)) {
    captureException(
      new Error(
        `Migration 36: Invalid root engine backgroundState: '${typeof state
          .engine.backgroundState}'`,
      ),
    );
    return state;
  }

  if (!isObject(state.engine.backgroundState.TransactionController)) {
    captureException(
      new Error(
        `Migration 36: Invalid TransactionController state: '${typeof state
          .engine.backgroundState.TransactionController}'`,
      ),
    );
    return state;
  }

  const transactionControllerState =
    state.engine.backgroundState.TransactionController;

  if (!hasProperty(transactionControllerState, 'transactions')) {
    captureException(
      new Error(
        `Migration 36: Missing transactions property from TransactionController: '${typeof state
          .engine.backgroundState.TransactionController}'`,
      ),
    );
    return state;
  }

  if ((transactionControllerState.transactions as []).length) {
    (transactionControllerState.transactions as []).forEach(
      (transaction: any) => {
        if (transaction.rawTransaction) {
          transaction.rawTx = transaction.rawTransaction;
          delete transaction.rawTransaction;
        }
        if (transaction.transactionHash) {
          transaction.hash = transaction.transactionHash;
          delete transaction.transactionHash;
        }
        if (transaction.transaction) {
          transaction.txParams = transaction.transaction;
          delete transaction.transaction;
        }
      },
    );
  }
  return state;
}
