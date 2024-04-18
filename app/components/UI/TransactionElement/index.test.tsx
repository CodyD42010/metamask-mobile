import React from 'react';
import TransactionElement from './';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import initialBackgroundState from '../../../util/test/initial-background-state.json';
import { MOCK_ACCOUNTS_CONTROLLER_STATE } from '../../../selectors/accountsController.test';

const mockStore = configureMockStore();
const initialState = {
  engine: {
    backgroundState: {
      ...initialBackgroundState,
      AccountsController: MOCK_ACCOUNTS_CONTROLLER_STATE,
    },
  },
  settings: {
    primaryCurrency: 'ETH',
  },
};
const store = mockStore(initialState);

describe('TransactionElement', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <TransactionElement
          tx={{
            transaction: { to: '0x0', from: '0x1', nonce: 1 },
            status: 'CONFIRMED',
          }}
          i={1}
        />
      </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
