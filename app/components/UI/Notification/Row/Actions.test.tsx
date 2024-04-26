import React from 'react';
import { Linking } from 'react-native';
import { fireEvent } from '@testing-library/react-native';

import renderWithProvider from '../../../../util/test/renderWithProvider';

import NotificationActions from './Actions';
import { ACTIONS, PREFIXES } from '../../../../constants/deeplinks';

Linking.openURL = jest.fn(() => Promise.resolve('opened https://metamask.io!'));

describe('NotificationActions', () => {
  const styles = {
    button: {},
  };
  const action = {
    actionText: 'Send now!',
    actionUrl: PREFIXES[ACTIONS.SEND],
    isExternal: false,
  };
  const link = {
    linkText: 'Learn more',
    linkUrl: 'https://metamask.io',
    isExternal: true,
  };

  it('renders correctly', () => {
    const { toJSON } = renderWithProvider(
      <NotificationActions action={action} link={link} styles={styles} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with LINK only', () => {
    const { toJSON } = renderWithProvider(
      <NotificationActions link={link} styles={styles} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders link title correctly', () => {
    const { getByText } = renderWithProvider(
      <NotificationActions link={link} styles={styles} />,
    );

    expect(getByText('Learn more')).toBeTruthy();
  });

  it('Calls Linking.openURL when link CTA is clicked', async () => {
    const { getByTestId } = renderWithProvider(
      <NotificationActions link={link} styles={styles} />,
    );

    fireEvent.press(getByTestId('notification-actions-button'));
    expect(Linking.openURL).toHaveBeenCalledTimes(1);
  });
});
