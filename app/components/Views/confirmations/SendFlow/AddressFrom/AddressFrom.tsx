import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import {
  newAssetTransaction,
  setSelectedAsset,
} from '../../../../../actions/transaction';
import Routes from '../../../../../constants/navigation/Routes';
import {
  selectChainId,
  selectTicker,
} from '../../../../../selectors/networkController';
import { selectAccounts } from '../../../../../selectors/accountTrackerController';
import { selectSelectedInternalAccount } from '../../../../../selectors/accountsController';
import { doENSReverseLookup } from '../../../../../util/ENSUtils';
import { renderFromWei, hexToBN } from '../../../../../util/number';
import { getEther, getTicker } from '../../../../../util/transactions';
import { AddressFrom } from '../../../../UI/AddressInputs';
import { SFAddressFromProps } from './AddressFrom.types';
import { toChecksumAddress } from 'ethereumjs-util';

const SendFlowAddressFrom = ({
  fromAccountBalanceState,
  setFromAddress,
}: SFAddressFromProps) => {
  const navigation = useNavigation();

  const accounts = useSelector(selectAccounts);

  const chainId = useSelector(selectChainId);
  const ticker = useSelector(selectTicker);

  const selectedInternalAccount = useSelector(selectSelectedInternalAccount);
  const checksummedSelectedAddress = toChecksumAddress(
    selectedInternalAccount.address,
  );

  const [accountAddress, setAccountAddress] = useState(
    checksummedSelectedAddress,
  );
  const [accountName, setAccountName] = useState(
    selectedInternalAccount.metadata.name,
  );
  const [accountBalance, setAccountBalance] = useState('');

  const dispatch = useDispatch();

  const selectedAsset = useSelector(
    (state: any) => state.transaction.selectedAsset,
  );

  const selectedAssetAction = useCallback(
    (asset: any) => dispatch(setSelectedAsset(asset)),
    [dispatch],
  );

  const newAssetTransactionAction = useCallback(
    (asset: any) => dispatch(newAssetTransaction(asset)),
    [dispatch],
  );

  const selectedAssetRef = useRef(selectedAsset);

  useEffect(() => {
    if (
      selectedAssetRef.current.isETH ||
      Object.keys(selectedAssetRef.current).length === 0
    ) {
      newAssetTransactionAction(getEther(ticker as string));
      selectedAssetAction(getEther(ticker as string));
    } else {
      newAssetTransactionAction(selectedAssetRef.current);
    }
  }, [newAssetTransactionAction, selectedAssetAction, ticker]);

  useEffect(() => {
    async function getAccount() {
      const ens = await doENSReverseLookup(checksummedSelectedAddress, chainId);
      const balance = `${renderFromWei(
        accounts[checksummedSelectedAddress].balance,
      )} ${getTicker(ticker)}`;
      const balanceIsZero = hexToBN(
        accounts[checksummedSelectedAddress].balance,
      ).isZero();
      setAccountName(ens || selectedInternalAccount.metadata.name);
      setAccountBalance(balance);
      fromAccountBalanceState(balanceIsZero);
    }
    getAccount();
  }, [
    accounts,
    checksummedSelectedAddress,
    ticker,
    chainId,
    fromAccountBalanceState,
    selectedInternalAccount.metadata.name,
  ]);

  const onSelectAccount = async (address: string) => {
    const name = selectedInternalAccount.metadata.name;
    const balance = `${renderFromWei(accounts[address].balance)} ${getTicker(
      ticker,
    )}`;
    const ens = await doENSReverseLookup(address);
    const accName = ens || name;
    const balanceIsZero = hexToBN(accounts[address].balance).isZero();
    selectedAssetAction(getEther(ticker as string));
    setAccountAddress(address);
    setAccountName(accName);
    setAccountBalance(balance);
    fromAccountBalanceState(balanceIsZero);
    setFromAddress(address);
  };

  const openAccountSelector = () => {
    navigation.navigate(Routes.MODAL.ROOT_MODAL_FLOW, {
      screen: Routes.SHEET.ACCOUNT_SELECTOR,
      params: {
        isSelectOnly: true,
        onSelectAccount,
      },
    });
  };

  return (
    <AddressFrom
      onPressIcon={openAccountSelector}
      fromAccountAddress={accountAddress}
      fromAccountName={accountName}
      fromAccountBalance={accountBalance}
    />
  );
};

export default SendFlowAddressFrom;
