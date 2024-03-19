const { execSync } = require('child_process');

const getAvailableAVDs = (() => {
  if (process.platform === 'darwin') {
    // If the platform is iOS, return nothing
    return;
  }
  try {
    // Run the command to list available AVDs
    const outputList = execSync("emulator -list-avds").toString();

    // Parse the output and return an array of AVD names
    const avdNames = outputList.trim().split("\n");

    // Check if the first AVD name is valid
    if (!avdNames[0].includes("Storing crashdata")) {
      return avdNames;
    } else {
      // Log a message and skip the invalid AVD name
      console.log(`Skipping emulator with AVD name '${avdNames[0]}' due to error.`);
      return avdNames.slice(1);
    }
  } catch (error) {
    // Handle errors
    console.error('Error:', error.message);
    process.exit(1);
  }
})();

module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.e2e.config.js',
    },
    jest: {
      setupTimeout: 220000,
    },
    retries: 1,
  },
  
  artifacts: {
    rootDir: "./artifacts/screenshots",
    plugins: {
      screenshot: {
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: true,
        takeWhen: {
          testStart: false,
          testDone: false,
        }
      },
    },
  }, 
  configurations: {
    'ios.sim.debug': {
      device: 'ios.simulator',
      app: 'ios.debug',
    },
    'ios.sim.release': {
      device: 'ios.simulator',
      app: 'ios.release',
    },
    'android.emu.debug': {
      device: 'android.emulator',
      app: 'android.debug',
    },
    'android.emu.release': {
      device: 'android.emulator',
      app: 'android.release',
    },
    'android.emu.release.qa': {
      device: 'android.emulator',
      app: 'android.qa',
    },
  },
  devices: {
    'ios.simulator': {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 13 Pro',
      },
    },
    'android.emulator': {
      type: 'android.emulator',
      device: {
        avdName: getAvailableAVDs[0],
      },
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/MetaMask.app',
      build: 'yarn start:ios:e2e',
    },
    'ios.release': {
      type: 'ios.app',
      binaryPath:
        'ios/build/Build/Products/Release-iphonesimulator/MetaMask.app',
      build: "METAMASK_BUILD_TYPE='main' METAMASK_ENVIRONMENT='production' yarn build:ios:release:e2e",
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/prod/debug/app-prod-debug.apk',
      build: 'yarn start:android:e2e',
    },
    'android.release': {
      type: 'android.apk',
      binaryPath:
        'android/app/build/outputs/apk/prod/release/app-prod-release.apk',
      build: "METAMASK_BUILD_TYPE='main' METAMASK_ENVIRONMENT='production' yarn build:android:release:e2e",
    },
    'android.qa': {
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/qa/release/app-qa-release.apk',
      build: "METAMASK_BUILD_TYPE='main' METAMASK_ENVIRONMENT='qa' yarn build:android:qa:e2e",
    },
  },
};
