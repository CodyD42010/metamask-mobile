'use strict';
import Browser from '../../../pages/Browser';
import TabBarComponent from '../../../pages/TabBarComponent';
import { loginToApp } from '../../../viewHelper';
import SigningModal from '../../../pages/modals/SigningModal';
import { TestDApp } from '../../../pages/TestDApp';
import FixtureBuilder from '../../../fixtures/fixture-builder';
import {
  withFixtures,
  defaultGanacheOptions,
} from '../../../fixtures/fixture-helper';
import { SmokeConfirmations } from '../../../tags';
import TestHelpers from '../../../helpers';

const MAX_ATTEMPTS = 3;

describe(SmokeConfirmations('Typed Sign V4'), () => {
  beforeAll(async () => {
    jest.setTimeout(2500000);
    await TestHelpers.reverseServerPort();
  });

  it('should sign typed V4 message', async () => {
    await withFixtures(
      {
        dapp: true,
        fixture: new FixtureBuilder()
          .withGanacheNetwork()
          .withPermissionControllerConnectedToTestDapp()
          .build(),
        restartDevice: true,
        ganacheOptions: defaultGanacheOptions,
      },
      async () => {
        await loginToApp();

        await TabBarComponent.tapBrowser();
        await Browser.navigateToTestDApp();

        await TestHelpers.retry(MAX_ATTEMPTS, async () => {
          await TestDApp.tapTypedV4SignButton();
          await SigningModal.isTypedRequestVisible();
          await SigningModal.tapCancelButton();
          await SigningModal.isNotVisible();

          await TestDApp.tapTypedV4SignButton();

          await SigningModal.tapSignButton();
          await SigningModal.isNotVisible();
        });
      },
    );
  });
});
