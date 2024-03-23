import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import NanoActivityIndicator from '../../libs/react-native-paper/components/ActivityIndicator';
import NanoAvatarIcon from '../../libs/react-native-paper/components/AvatarIcon/AvatarIcon';
import NanoAvatarImage from '../../libs/react-native-paper/components/AvatarImage';
import NanoAvatarText from '../../libs/react-native-paper/components/AvatarText/AvatarText';
import Badge from '../../libs/react-native-paper/components/Badge/Badge';
import NanoBanner from '../../libs/react-native-paper/components/Banner/Banner';
import NanoButton from '../../libs/react-native-paper/components/Button/Button';
import NanoCard from '../../libs/react-native-paper/components/Card/Card';
import NanoCardActions from '../../libs/react-native-paper/components/CardActions/CardActions';
import NanoCardContent from '../../libs/react-native-paper/components/CardContent/CardContent';
import NanoCardCover from '../../libs/react-native-paper/components/CardCover/CardCover';
import NanoCardTitle from '../../libs/react-native-paper/components/CardTitle/CardTitle';

import NanoCheckBox from '../../libs/react-native-paper/components/CheckBox/CheckBox';
import NanoChip from '../../libs/react-native-paper/components/Chip/Chip';
import NanoHelperText from '../../libs/react-native-paper/components/HelperText/HelperText';

import NanoSegmentedButtons from '../../libs/react-native-paper/components/SegmentedButtons/SegmentedButtons';

import NanoToolTip from '../../libs/react-native-paper/components/ToolTip/ToolTip';

import NanoDialog from '../../libs/react-native-paper/components/Dialog/Dialog';
import NanoDialogActions from '../../libs/react-native-paper/components/DialogActions/DialogActions';
import NanoDialogContent from '../../libs/react-native-paper/components/DialogContent/DialogContent';
import NanoDialogScrollArea from '../../libs/react-native-paper/components/DialogScrollArea/DialogScrollArea';
import NanoDialogTitle from '../../libs/react-native-paper/components/DialogTitle/DialogTitle';
import NanoDivider from '../../libs/react-native-paper/components/Divider/Divider';
import NanoFab from '../../libs/react-native-paper/components/Fab/Fab';
import NanoIconButton from '../../libs/react-native-paper/components/IconButton/IconButton';
import NanoImage from '../../libs/react-native-paper/components/Image/Image';
import NanoModal from '../../libs/react-native-paper/components/Modal/Modal';
import NanoProgressbar from '../../libs/react-native-paper/components/ProgressBar/ProgressBar';
import NanoRadioButton from '../../libs/react-native-paper/components/RadioButton/RadioButton';
import NanoSearchBar from '../../libs/react-native-paper/components/SearchBar/SearchBar';
import NanoSwitch from '../../libs/react-native-paper/components/Switch/Switch';
import NanoText from '../../libs/react-native-paper/components/Text/Text';
import NanoTextInput from '../../libs/react-native-paper/components/TextInput/TextInput';
import NanoVideoPlayer from '../../libs/react-native-paper/components/VideoPlayer/VideoPlayer';
import NanoYoutubePlayer from '../../libs/react-native-paper/components/Youtube/YoutubePlayer';
import NanoScrollView from '../../libs/react-native-paper/components/ScrollView/ScrollView';
import {getPlatform} from '../modules/platform/platform';
import NANO from '../../Constants';
import {
  checkNameAndRenderCustomComponent,
  getInterceptedFunctionProps,
  getViewItems,
  modifyElemObjAsPerTheme,
  onElementLoaded,
} from '../utils/Utilities';
import NanoAppBarAction from '../../libs/react-native-paper/components/AppBarAction/AppBarAction';
import NanoAppBarBackAction from '../../libs/react-native-paper/components/AppBarBackAction';
import NanoAppBarHeader from '../../libs/react-native-paper/components/AppBarHeader/AppBarHeader';
import NanoAppBarContent from '../../libs/react-native-paper/components/AppBarContent/AppBarContent';
import AnimatedView from '../../libs/react-native-paper/components/AnimatedView';

import {animateUi} from '../hooks/UseReanimationHook';

import ReanimatedHOC from './ReanimatedHOC';
import ReanimatedComponent from '../../libs/react-native-paper/components/ReanimatedComponent';
interface ElementProps<T> {
  component: string;
  [key: string]: any;

  props: T;
}

interface Props {
  // elemOb: ElementProps;
  getUi: () => void;
  onPressCallBack: () => void;

  index: number;
  [key: string]: any;
}
const getElementAsPerComponent: React.FC<Props> = ({
  elemOb,
  index = null,

  recyclerListViewFunctionProps,
  propParameters,
  onPressCallBack,
  getUi,
  customComponents,
  uniqueKey,
  themes,
  context,
  componentParams,
}) => {
  let elemObjAfterThemesSet = elemOb;

  if (themes != null && themes.length > 0) {
    elemObjAfterThemesSet = modifyElemObjAsPerTheme(elemOb, themes, context);
  }

  if (
    elemObjAfterThemesSet != null &&
    elemObjAfterThemesSet['component'] != null
  ) {
    if (
      elemObjAfterThemesSet['hide'] != null &&
      elemObjAfterThemesSet['hide'] == true
    ) {
      return null;
    }
    if (
      elemObjAfterThemesSet['platform'] != null &&
      elemObjAfterThemesSet['platform'].length > 0 &&
      !elemObjAfterThemesSet['platform'].includes(getPlatform())
    ) {
      return null;
    }

    let funProps = null;

    if (recyclerListViewFunctionProps != null) {
      funProps = recyclerListViewFunctionProps;

      // this has to be for the parent view of the itemview. Its children wont have recyclerListViewFunctionProps
    } else {
      funProps = getInterceptedFunctionProps({
        eleObject: elemObjAfterThemesSet,

        props: {
          moduleParams: {...propParameters, theme: context},
          componentParams,

          setUi: onPressCallBack,
          getUi: getUi,
          animateUi: animateUi,
        },
      });
    }

    const elementProps = {
      ...elemObjAfterThemesSet,
      ...funProps,
    };

    const renderChildren = (
      contentArr,
      shouldOnpPressAllowed,
      onComponentLoaded,
      uniKey = uniqueKey,
    ) => {
      return getViewItems({
        content: contentArr,
        customComponents,
        getUi,

        onPressCallBack,
        propParameters,
        recyclerListViewFunctionProps,
        uniqueKey: uniKey,
        themes,
        componentParams,
      });
    };

    // ! onPressCallback is a function that takes the complete JSON data and setstates it.
    // ! Use this funtion to modify UI.
    const onElementLoad = loadedElemObject => {
      onElementLoaded({
        getUi: getUi,
        onPressCallBack: onPressCallBack,
        loadedElemObject,
        propParameters: propParameters,
      });
    };

    switch (elemObjAfterThemesSet['component']) {
      case NANO.BUTTON:
        return (
          <NanoButton
            elementProps={elementProps}
            key={'button' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.TEXT:
        if (
          elementProps &&
          elementProps['animation'] != null &&
          elementProps['animation']['advanced'] != null
        ) {
          return (
            <ReanimatedHOC
              elementProps={elementProps}
              getViewItems={renderChildren}
              onElementLoaded={onElementLoad}
            />
          );
        }
        return (
          <NanoText
            key={'text' + index}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.MODAL:
        return (
          <NanoModal
            key={'text' + index}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.ACTIVITY_INDICATOR:
        return (
          <NanoActivityIndicator
            key={'activityindicator' + index}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.IMAGE:
        if (
          elementProps &&
          elementProps['animation'] != null &&
          elementProps['animation']['advanced'] != null
        ) {
          return (
            <ReanimatedHOC
              elementProps={elementProps}
              getViewItems={renderChildren}
              onElementLoaded={onElementLoad}
            />
          );
        }
        return (
          <NanoImage
            elementProps={elementProps}
            key={'image' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.ICON_BUTTON:
        return (
          <NanoIconButton
            elementProps={elementProps}
            key={'iconbutton' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.AVATAR_ICON:
        return (
          <NanoAvatarIcon
            elementProps={elementProps}
            key={'avatarIcon' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.AVATAR_IMAGE:
        return (
          <NanoAvatarImage
            elementProps={elementProps}
            key={'avatarimage' + index}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.AVATAR_TEXT:
        return (
          <NanoAvatarText
            key={'avatar_text' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.BADGE:
        return (
          <Badge
            key={'badge_text' + index}
            getViewItems={renderChildren}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.CHECKBOX:
        return (
          <NanoCheckBox
            key={'checkbox' + index}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.CHIP:
        return (
          <NanoChip
            elementProps={elementProps}
            key={'chip' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.APPBAR_ACTION:
        return (
          <NanoAppBarAction
            elementProps={elementProps}
            key={'appbaraction' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.APPBAR_BACK_ACTION:
        return (
          <NanoAppBarBackAction
            elementProps={elementProps}
            key={'appbarbackaction' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.APPBAR_HEADER:
        return (
          <NanoAppBarHeader
            elementProps={elementProps}
            key={'appbarheader' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.APPBAR_CONTENT:
        return (
          <NanoAppBarContent
            elementProps={elementProps}
            key={'appbarcontent' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.HELPER_TEXT:
        return (
          <NanoHelperText
            elementProps={elementProps}
            key={'helptext' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.TOOLTIP:
        return (
          <NanoToolTip
            elementProps={elementProps}
            key={'tooltip' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.SEGMENTED_BUTTONS:
        return (
          <NanoSegmentedButtons
            elementProps={elementProps}
            key={'segmentedbuttons' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.FAB:
        return (
          <NanoFab
            key={'fab' + index}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );
      case NANO.PROGRESS_BAR:
        return (
          <NanoProgressbar
            key={'progress_bar' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.RADIO_BUTTON:
        return (
          <NanoRadioButton
            elemObjAfterThemesSet={elemObjAfterThemesSet}
            getViewItems={renderChildren}
            key={'radio_button' + index}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.SWITCH:
        return (
          <NanoSwitch
            elementProps={elementProps}
            key={'switch' + index}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.TEXT_INPUT:
        return (
          <NanoTextInput
            elementProps={elementProps}
            key={'textinput' + index}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.SEARCH_BAR:
        return (
          <NanoSearchBar
            getViewItems={renderChildren}
            elementProps={elementProps}
            key={'searchbar' + index}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.BANNER:
        return (
          <NanoBanner
            key={'banner' + index}
            getViewItems={renderChildren}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.DIVIDER:
        return (
          <NanoDivider
            elementProps={elementProps}
            key={'divider' + index}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD:
        return (
          <NanoCard
            key={'card' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD_CONTENT:
        return (
          <NanoCardContent
            key={'card_content' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.SCROLL_VIEW:
        return (
          <NanoScrollView
            key={'scroll_view' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.ANIMATED_VIEW:
        return (
          <AnimatedView
            key={'animated_view' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.CARD_ACTION:
        return (
          <NanoCardActions
            key={'card_actions' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD_TITLE:
        return (
          <NanoCardTitle
            key={'card_title' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD_COVER:
        return (
          <NanoCardCover
            key={'card_cover' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.DIALOG:
        return (
          <NanoDialog
            key={'dialog' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.DIALOG_CONTENT:
        return (
          <NanoDialogContent
            key={'dialog_content' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.DIALOG_ACTION:
        return (
          <NanoDialogActions
            key={'dialog_actions' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.DIALOG_TITLE:
        return (
          <NanoDialogTitle
            key={'dialog_title' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.DIALOG_SCROLLAREA:
        return (
          <NanoDialogScrollArea
            key={'dialog_scrollview' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.VIDEO:
        return (
          <NanoVideoPlayer
            key={'video_player' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.YOUTUBE_PLAYER:
        return (
          <NanoYoutubePlayer
            key={'youtube_player' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.VIEW:
        if (
          elementProps &&
          elementProps['animation'] != null &&
          elementProps['animation']['advanced'] != null
        ) {
          return (
            <ReanimatedHOC
              elementProps={elementProps}
              getViewItems={renderChildren}
              onElementLoaded={onElementLoad}
              elemObjAfterThemesSet={elemObjAfterThemesSet}
              index={index}
            />
          );
        }
        if (elemObjAfterThemesSet['onPress'] != null) {
          return (
            <TouchableOpacity
              key={'TouchableOpacity' + index}
              {...elementProps['props']}
              {...elementProps}>
              {getViewItems({
                content: elemObjAfterThemesSet['content'],
                customComponents,
                getUi,

                onPressCallBack,
                propParameters,
                recyclerListViewFunctionProps,
                uniqueKey,
                themes,
                componentParams,
              })}
            </TouchableOpacity>
          );
        }

        return (
          <View
            key={'view' + index}
            {...elementProps['props']}
            {...elementProps}>
            {getViewItems({
              content: elemObjAfterThemesSet['content'],
              customComponents,
              getUi,

              onPressCallBack,
              propParameters,
              recyclerListViewFunctionProps,
              uniqueKey,
              themes,
              componentParams,
            })}
          </View>
        );

      case NANO.REANIMATED_COMPONENT:
        const customComp = getViewItems({
          content: elementProps['content'],
          customComponents,
          getUi,

          onPressCallBack,
          propParameters,
          recyclerListViewFunctionProps,
          uniqueKey,
          themes,
          componentParams,
        });

        return (
          <ReanimatedComponent
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
            component={customComp}
          />
        );

      default:
        const custom = checkNameAndRenderCustomComponent({
          componentName: elemObjAfterThemesSet['component'],
          compsArray: customComponents,
          onElementLoaded,
          elementProps,
          getViewItems,
        });
        if (custom) {
          return custom;
        }

        return;
    }
  }
  return <Text key={'error' + index}> {'No such component'} </Text>;
};

export default getElementAsPerComponent;
