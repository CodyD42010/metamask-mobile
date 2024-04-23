/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./app/component-library/components",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:app\\/component-library\\/components(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
  {
    titlePrefix: "",
    directory: "./app/component-library/components-temp/TagColored",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:app\\/component-library\\/components-temp\\/TagColored(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
];

import "@storybook/addon-ondevice-controls/register";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

const getStories = () => {
  return {
    "./app/component-library/components/Accordions/Accordion/Accordion.stories.tsx": require("../app/component-library/components/Accordions/Accordion/Accordion.stories.tsx"),
    "./app/component-library/components/Accordions/Accordion/foundation/AccordionHeader/AccordionHeader.stories.tsx": require("../app/component-library/components/Accordions/Accordion/foundation/AccordionHeader/AccordionHeader.stories.tsx"),
    "./app/component-library/components/Avatars/Avatar/Avatar.stories.tsx": require("../app/component-library/components/Avatars/Avatar/Avatar.stories.tsx"),
    "./app/component-library/components/Avatars/Avatar/variants/AvatarAccount/AvatarAccount.stories.tsx": require("../app/component-library/components/Avatars/Avatar/variants/AvatarAccount/AvatarAccount.stories.tsx"),
    "./app/component-library/components/Avatars/Avatar/variants/AvatarFavicon/AvatarFavicon.stories.tsx": require("../app/component-library/components/Avatars/Avatar/variants/AvatarFavicon/AvatarFavicon.stories.tsx"),
    "./app/component-library/components/Avatars/Avatar/variants/AvatarIcon/AvatarIcon.stories.tsx": require("../app/component-library/components/Avatars/Avatar/variants/AvatarIcon/AvatarIcon.stories.tsx"),
    "./app/component-library/components/Avatars/Avatar/variants/AvatarNetwork/AvatarNetwork.stories.tsx": require("../app/component-library/components/Avatars/Avatar/variants/AvatarNetwork/AvatarNetwork.stories.tsx"),
    "./app/component-library/components/Avatars/Avatar/variants/AvatarToken/AvatarToken.stories.tsx": require("../app/component-library/components/Avatars/Avatar/variants/AvatarToken/AvatarToken.stories.tsx"),
    "./app/component-library/components/Badges/Badge/Badge.stories.tsx": require("../app/component-library/components/Badges/Badge/Badge.stories.tsx"),
    "./app/component-library/components/Badges/Badge/variants/BadgeNetwork/BadgeNetwork.stories.tsx": require("../app/component-library/components/Badges/Badge/variants/BadgeNetwork/BadgeNetwork.stories.tsx"),
    "./app/component-library/components/Badges/Badge/variants/BadgeStatus/BadgeStatus.stories.tsx": require("../app/component-library/components/Badges/Badge/variants/BadgeStatus/BadgeStatus.stories.tsx"),
    "./app/component-library/components/Badges/BadgeWrapper/BadgeWrapper.stories.tsx": require("../app/component-library/components/Badges/BadgeWrapper/BadgeWrapper.stories.tsx"),
    "./app/component-library/components/Banners/Banner/Banner.stories.tsx": require("../app/component-library/components/Banners/Banner/Banner.stories.tsx"),
    "./app/component-library/components/Banners/Banner/variants/BannerAlert/BannerAlert.stories.tsx": require("../app/component-library/components/Banners/Banner/variants/BannerAlert/BannerAlert.stories.tsx"),
    "./app/component-library/components/Banners/Banner/variants/BannerTip/BannerTip.stories.tsx": require("../app/component-library/components/Banners/Banner/variants/BannerTip/BannerTip.stories.tsx"),
    "./app/component-library/components/BottomSheets/BottomSheet/BottomSheet.stories.tsx": require("../app/component-library/components/BottomSheets/BottomSheet/BottomSheet.stories.tsx"),
    "./app/component-library/components/BottomSheets/BottomSheetFooter/BottomSheetFooter.stories.tsx": require("../app/component-library/components/BottomSheets/BottomSheetFooter/BottomSheetFooter.stories.tsx"),
    "./app/component-library/components/BottomSheets/BottomSheetHeader/BottomSheetHeader.stories.tsx": require("../app/component-library/components/BottomSheets/BottomSheetHeader/BottomSheetHeader.stories.tsx"),
    "./app/component-library/components/Buttons/Button/Button.stories.tsx": require("../app/component-library/components/Buttons/Button/Button.stories.tsx"),
    "./app/component-library/components/Buttons/Button/variants/ButtonLink/ButtonLink.stories.tsx": require("../app/component-library/components/Buttons/Button/variants/ButtonLink/ButtonLink.stories.tsx"),
    "./app/component-library/components/Buttons/Button/variants/ButtonPrimary/ButtonPrimary.stories.tsx": require("../app/component-library/components/Buttons/Button/variants/ButtonPrimary/ButtonPrimary.stories.tsx"),
    "./app/component-library/components/Buttons/Button/variants/ButtonSecondary/ButtonSecondary.stories.tsx": require("../app/component-library/components/Buttons/Button/variants/ButtonSecondary/ButtonSecondary.stories.tsx"),
    "./app/component-library/components/Buttons/ButtonIcon/ButtonIcon.stories.tsx": require("../app/component-library/components/Buttons/ButtonIcon/ButtonIcon.stories.tsx"),
    "./app/component-library/components/Cards/Card/Card.stories.tsx": require("../app/component-library/components/Cards/Card/Card.stories.tsx"),
    "./app/component-library/components/Cells/Cell/Cell.stories.tsx": require("../app/component-library/components/Cells/Cell/Cell.stories.tsx"),
    "./app/component-library/components/Cells/Cell/variants/CellDisplay/CellDisplay.stories.tsx": require("../app/component-library/components/Cells/Cell/variants/CellDisplay/CellDisplay.stories.tsx"),
    "./app/component-library/components/Cells/Cell/variants/CellMultiSelect/CellMultiSelect.stories.tsx": require("../app/component-library/components/Cells/Cell/variants/CellMultiSelect/CellMultiSelect.stories.tsx"),
    "./app/component-library/components/Cells/Cell/variants/CellSelect/CellSelect.stories.tsx": require("../app/component-library/components/Cells/Cell/variants/CellSelect/CellSelect.stories.tsx"),
    "./app/component-library/components/Checkbox/Checkbox.stories.tsx": require("../app/component-library/components/Checkbox/Checkbox.stories.tsx"),
    "./app/component-library/components/Form/HelpText/HelpText.stories.tsx": require("../app/component-library/components/Form/HelpText/HelpText.stories.tsx"),
    "./app/component-library/components/Form/Label/Label.stories.tsx": require("../app/component-library/components/Form/Label/Label.stories.tsx"),
    "./app/component-library/components/Form/TextField/foundation/Input/Input.stories.tsx": require("../app/component-library/components/Form/TextField/foundation/Input/Input.stories.tsx"),
    "./app/component-library/components/Form/TextField/TextField.stories.tsx": require("../app/component-library/components/Form/TextField/TextField.stories.tsx"),
    "./app/component-library/components/Form/TextFieldSearch/TextFieldSearch.stories.tsx": require("../app/component-library/components/Form/TextFieldSearch/TextFieldSearch.stories.tsx"),
    "./app/component-library/components/HeaderBase/HeaderBase.stories.tsx": require("../app/component-library/components/HeaderBase/HeaderBase.stories.tsx"),
    "./app/component-library/components/Icons/Icon/Icon.stories.tsx": require("../app/component-library/components/Icons/Icon/Icon.stories.tsx"),
    "./app/component-library/components/List/ListItem/ListItem.stories.tsx": require("../app/component-library/components/List/ListItem/ListItem.stories.tsx"),
    "./app/component-library/components/List/ListItemMultiSelect/ListItemMultiSelect.stories.tsx": require("../app/component-library/components/List/ListItemMultiSelect/ListItemMultiSelect.stories.tsx"),
    "./app/component-library/components/List/ListItemSelect/ListItemSelect.stories.tsx": require("../app/component-library/components/List/ListItemSelect/ListItemSelect.stories.tsx"),
    "./app/component-library/components/Modals/ModalConfirmation/ModalConfirmation.stories.tsx": require("../app/component-library/components/Modals/ModalConfirmation/ModalConfirmation.stories.tsx"),
    "./app/component-library/components/Modals/ModalMandatory/ModalMandatory.stories.tsx": require("../app/component-library/components/Modals/ModalMandatory/ModalMandatory.stories.tsx"),
    "./app/component-library/components/Navigation/TabBar/TabBar.stories.tsx": require("../app/component-library/components/Navigation/TabBar/TabBar.stories.tsx"),
    "./app/component-library/components/Navigation/TabBarItem/TabBarItem.stories.tsx": require("../app/component-library/components/Navigation/TabBarItem/TabBarItem.stories.tsx"),
    "./app/component-library/components/Overlay/Overlay.stories.tsx": require("../app/component-library/components/Overlay/Overlay.stories.tsx"),
    "./app/component-library/components/Pickers/PickerAccount/PickerAccount.stories.tsx": require("../app/component-library/components/Pickers/PickerAccount/PickerAccount.stories.tsx"),
    "./app/component-library/components/Pickers/PickerNetwork/PickerNetwork.stories.tsx": require("../app/component-library/components/Pickers/PickerNetwork/PickerNetwork.stories.tsx"),
    "./app/component-library/components/RadioButton/RadioButton.stories.tsx": require("../app/component-library/components/RadioButton/RadioButton.stories.tsx"),
    "./app/component-library/components/Select/SelectButton/SelectButton.stories.tsx": require("../app/component-library/components/Select/SelectButton/SelectButton.stories.tsx"),
    "./app/component-library/components/Select/SelectOption/SelectOption.stories.tsx": require("../app/component-library/components/Select/SelectOption/SelectOption.stories.tsx"),
    "./app/component-library/components/Select/SelectValue/SelectValue.stories.tsx": require("../app/component-library/components/Select/SelectValue/SelectValue.stories.tsx"),
    "./app/component-library/components/Sheet/SheetBottom/SheetBottom.stories.tsx": require("../app/component-library/components/Sheet/SheetBottom/SheetBottom.stories.tsx"),
    "./app/component-library/components/Sheet/SheetHeader/SheetHeader.stories.tsx": require("../app/component-library/components/Sheet/SheetHeader/SheetHeader.stories.tsx"),
    "./app/component-library/components/Tags/NameTag/NameTag.stories.tsx": require("../app/component-library/components/Tags/NameTag/NameTag.stories.tsx"),
    "./app/component-library/components/Tags/Tag/Tag.stories.tsx": require("../app/component-library/components/Tags/Tag/Tag.stories.tsx"),
    "./app/component-library/components/Tags/TagUrl/TagUrl.stories.tsx": require("../app/component-library/components/Tags/TagUrl/TagUrl.stories.tsx"),
    "./app/component-library/components/Texts/Text/Text.stories.tsx": require("../app/component-library/components/Texts/Text/Text.stories.tsx"),
    "./app/component-library/components/Texts/TextWithPrefixIcon/TextWithPrefixIcon.stories.tsx": require("../app/component-library/components/Texts/TextWithPrefixIcon/TextWithPrefixIcon.stories.tsx"),
    "./app/component-library/components/Toast/Toast.stories.tsx": require("../app/component-library/components/Toast/Toast.stories.tsx"),
    "./app/component-library/components-temp/TagColored/TagColored.stories.tsx": require("../app/component-library/components-temp/TagColored/TagColored.stories.tsx"),
  };
};

configure(getStories, module, false);
