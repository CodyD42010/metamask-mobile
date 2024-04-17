import { captureException } from '@sentry/react-native';
import { isObject } from '@metamask/utils';
import { ensureValidState } from './util';

export default function migrate(state: unknown) {
  if (!ensureValidState(state, 39)) {
    return state;
  }

  const currencyRateState = state.engine.backgroundState.CurrencyRateController;

  if (!isObject(currencyRateState)) {
    captureException(
      new Error(
        `Migration 39: Invalid CurrencyRateController state error: '${JSON.stringify(
          currencyRateState,
        )}'`,
      ),
    );
    return state;
  }

  const currentCurrency = currencyRateState.currentCurrency;
  const nativeCurrency = currencyRateState.nativeCurrency;
  const conversionRate = currencyRateState.conversionRate;
  const conversionDate = currencyRateState.conversionDate;
  const usdConversionRate = currencyRateState.usdConversionRate;

  delete currencyRateState.pendingCurrentCurrency;
  delete currencyRateState.pendingNativeCurrency;

  state.engine.backgroundState.CurrencyRateController = {
    currentCurrency,
    currencyRates: {
      [nativeCurrency as string]: {
        conversionRate,
        conversionDate,
        usdConversionRate,
      },
    },
  };

  return state;
}
