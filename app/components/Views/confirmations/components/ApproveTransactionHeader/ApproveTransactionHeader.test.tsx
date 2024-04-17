import React from 'react';

import renderWithProvider from '../../../../../util/test/renderWithProvider';
import ApproveTransactionHeader from '.';
import initialBackgroundState from '../../../../../util/test/initial-background-state.json';
import { APPROVE_TRANSACTION_ORIGIN_PILL } from './ApproveTransactionHeader.constants';
import {
  createMockInternalAccount,
  createMockUUIDFromAddress,
} from '../../../../../selectors/accountsController.test';
import { AccountsControllerState } from '@metamask/accounts-controller';

const MOCK_ADDRESS = '0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272';
const MOCK_ADDRESS_2 = '0xd018538C87232FF95acbCe4870629b75640a78E7';

const expectedUUID = createMockUUIDFromAddress(MOCK_ADDRESS);
const expectedUUID2 = createMockUUIDFromAddress(MOCK_ADDRESS_2);

const internalAccount1 = createMockInternalAccount(
  MOCK_ADDRESS.toLowerCase(),
  'Account 1',
);
const internalAccount2 = createMockInternalAccount(
  MOCK_ADDRESS_2.toLowerCase(),
  'Account 2',
);

const MOCK_ACCOUNTS_CONTROLLER_STATE: AccountsControllerState = {
  internalAccounts: {
    accounts: {
      [expectedUUID]: internalAccount1,
      [expectedUUID2]: internalAccount2,
    },
    selectedAccount: expectedUUID,
  },
};

jest.mock('../../../../../core/Engine', () => ({
  context: {
    TokensController: {
      addToken: () => undefined,
    },
    KeyringController: {
      state: {
        keyrings: [],
      },
    },
  },
}));

const mockInitialState = {
  settings: {},
  engine: {
    backgroundState: {
      ...initialBackgroundState,
      AccountTrackerController: {
        accounts: {
          [MOCK_ADDRESS]: {
            balance: '200',
          },
          [MOCK_ADDRESS_2]: {
            balance: '200',
          },
        },
      },
      PreferencesController: {
        selectedAddress: MOCK_ADDRESS,
        identities: {
          [MOCK_ADDRESS]: {
            address: MOCK_ADDRESS,
            name: 'Account 1',
          },
          [MOCK_ADDRESS_2]: {
            address: MOCK_ADDRESS_2,
            name: 'Account 2',
          },
        },
      },
      AccountsController: MOCK_ACCOUNTS_CONTROLLER_STATE,
      NetworkController: {
        providerConfig: {
          chainId: '0xaa36a7',
          type: 'sepolia',
          nickname: 'Sepolia',
        },
      },
    },
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest
    .fn()
    .mockImplementation((callback) => callback(mockInitialState)),
}));

describe('ApproveTransactionHeader', () => {
  it('should render correctly', () => {
    const wrapper = renderWithProvider(
      <ApproveTransactionHeader
        from="0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272"
        origin="http://metamask.github.io"
        url="http://metamask.github.io"
        asset={{
          address: '0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272',
          symbol: 'ERC',
          decimals: 4,
        }}
      />,
      { state: mockInitialState },
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with domain title', () => {
    const { getByText } = renderWithProvider(
      <ApproveTransactionHeader
        from="0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272"
        origin="http://metamask.github.io"
        url="http://metamask.github.io"
        asset={{
          address: '0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272',
          symbol: 'ERC',
          decimals: 4,
        }}
      />,
      { state: mockInitialState },
    );
    expect(getByText('http://metamask.github.io')).toBeDefined();
  });

  it('should get origin when present', () => {
    const { getByText } = renderWithProvider(
      <ApproveTransactionHeader
        from="0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272"
        origin="http://metamask.github.io"
        url="http://metamask.github.io"
        asset={{
          address: '0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272',
          symbol: 'RAN',
          decimals: 18,
        }}
      />,
      { state: mockInitialState },
    );
    expect(getByText('http://metamask.github.io')).toBeDefined();
  });

  it('should return origin to be null when not present', () => {
    const container = renderWithProvider(
      <ApproveTransactionHeader
        from="0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272"
        origin={undefined}
        url="http://metamask.github.io"
        asset={{
          address: '0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272',
          symbol: 'RAN',
          decimals: 18,
        }}
      />,
      { state: mockInitialState },
    );
    expect(container).toMatchSnapshot();
  });

  it('should not show an origin pill if origin is deeplink', () => {
    const { queryByTestId } = renderWithProvider(
      <ApproveTransactionHeader
        from="0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272"
        origin="qr-code"
        url="http://metamask.github.io"
        asset={{
          address: '0xC4955C0d639D99699Bfd7Ec54d9FaFEe40e4D272',
          symbol: 'RAN',
          decimals: 18,
        }}
      />,
      { state: mockInitialState },
    );

    const originPill = queryByTestId(APPROVE_TRANSACTION_ORIGIN_PILL);
    expect(originPill).toBeNull();
  });
});
