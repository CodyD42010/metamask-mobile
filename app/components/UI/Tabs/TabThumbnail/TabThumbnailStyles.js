import { StyleSheet, Dimensions } from 'react-native';
import { fontStyles, colors as importedColors } from '../../../../styles/common';
import Device from '../../../../util/device';

const margin = 15;
const width = Dimensions.get('window').width - margin * 2;
const height = Dimensions.get('window').height / (Device.isIphone5S() ? 4 : 5);
let paddingTop = Dimensions.get('window').height - 190;
if (Device.isIphoneX()) {
  paddingTop -= 65;
}
if (Device.isAndroid()) {
  paddingTop -= 10;
}

export const createStyles = (colors) => StyleSheet.create({
  tabFavicon: {
    alignSelf: 'flex-start',
    width: 22,
    height: 22,
    marginRight: 5,
    marginLeft: 2,
    marginTop: 1,
  },
  tabSiteName: {
    color: colors.text.default,
    ...fontStyles.bold,
    fontSize: 18,
    marginRight: 40,
    marginLeft: 5,
    marginTop: 0,
  },
  tabHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: colors.background.default,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tabWrapper: {
    marginBottom: 15,
    borderRadius: 10,
    elevation: 8,
    justifyContent: 'space-evenly',
    overflow: 'hidden',
    borderColor: colors.border.default,
    borderWidth: 1,
    width,
    height,
  },
  checkWrapper: {
    backgroundColor: importedColors.transparent,
    overflow: 'hidden',
  },
  tab: {
    backgroundColor: colors.background.default,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  tabImage: {
    ...StyleSheet.absoluteFillObject,
    paddingTop,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  activeTab: {
    borderWidth: 5,
    borderColor: colors.primary.default,
  },
  closeTabIcon: {
    paddingHorizontal: 10,
    paddingTop: 3,
    fontSize: 32,
    color: colors.text.default,
    right: 0,
    marginTop: -7,
    position: 'absolute',
  },
  titleButton: {
    backgroundColor: importedColors.transparent,
    flex: 1,
    flexDirection: 'row',
    marginRight: 40,
  },
  closeTabButton: {
    backgroundColor: importedColors.transparent,
    width: Device.isIos() ? 30 : 35,
    height: 24,
    marginRight: -5,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 36,
    backgroundColor: colors.background.default,
    borderTopColor: colors.border.default,
    borderTopWidth: 1,
    padding: 8,
  },
  footerText: {
    width: '90%',
  },
  badgeWrapperContainer: {
    paddingRight: 8,
    paddingLeft: 2,
  },
  networkBadge: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.background.default,
  },
});