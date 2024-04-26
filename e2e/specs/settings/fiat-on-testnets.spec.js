'use strict';
import { SmokeCore } from '../../tags';
import SettingsView from '../../pages/Settings/SettingsView';
import TabBarComponent from '../../pages/TabBarComponent';
import { loginToApp } from '../../viewHelper';
import FixtureBuilder from '../../fixtures/fixture-builder';
import { withFixtures } from '../../fixtures/fixture-helper';
import TestHelpers from '../../helpers';
import { CustomNetworks } from '../../resources/networks.e2e';
import NetworkListModal from '../../pages/modals/NetworkListModal';
import WalletView from '../../pages/WalletView';
import NetworkEducationModal from '../../pages/modals/NetworkEducationModal';
import AdvancedSettingsView from '../../pages/Settings/AdvancedView';
import { CONTINUE_BUTTON } from '../../../wdio/screen-objects/testIDs/Components/FiatOnTestnetsModal.testIds';
import { TOTAL_BALANCE_TEXT } from '../../../wdio/screen-objects/testIDs/Components/Tokens.testIds.js';

const SEPOLIA = CustomNetworks.Sepolia.providerConfig.nickname;

describe(SmokeCore('Fiat On Testnets Setting'), () => {
  beforeEach(() => jest.setTimeout(150000));

  it('should show fiat values on testnets when enabled', async () => {
    await withFixtures(
      {
        fixture: new FixtureBuilder().build(),
        restartDevice: true,
      },
      async () => {
        await loginToApp();

        // Switch to Sepolia
        await WalletView.tapNetworksButtonOnNavBar();
        await NetworkListModal.changeNetwork(SEPOLIA);
        await NetworkEducationModal.tapGotItButton();

        // Verify no fiat values displayed
        await TestHelpers.checkIfHasText(TOTAL_BALANCE_TEXT, '$0');

        // Enable fiat on testnets setting
        await TabBarComponent.tapSettings();
        await SettingsView.tapAdvancedTitle();
        await AdvancedSettingsView.tapShowFiatOnTestnetsSwitch();
        await TestHelpers.waitAndTap(CONTINUE_BUTTON);

        // Verify fiat values are displayed
        await TabBarComponent.tapWallet();
        await TestHelpers.checkIfElementNotToHaveText(TOTAL_BALANCE_TEXT, '$0');
      },
    );
  });
});
