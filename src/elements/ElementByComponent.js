import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';
import NanoActivityIndicator from '../components/ActivityIndicator';
import NanoAvatarIcon from '../components/AvatarIcon/AvatarIcon';
import NanoAvatarImage from '../components/AvatarImage';
import NanoAvatarText from '../components/AvatarText/AvatarText';
import Badge from '../components/Badge/Badge';
import NanoBanner from '../components/Banner/Banner';
import NanoButton from '../components/Button/Button';
import NanoCard from '../components/Card/Card';
import NanoCardActions from '../components/CardActions/CardActions';
import NanoCardContent from '../components/CardContent/CardContent';
import NanoCardCover from '../components/CardCover/CardCover';
import NanoCardTitle from '../components/CardTitle/CardTitle';

import NanoCheckBox from '../components/CheckBox/CheckBox';
import NanoChip from '../components/Chip/Chip';
import NanoDialog from '../components/Dialog/Dialog';
import NanoDialogActions from '../components/DialogActions/DialogActions';
import NanoDialogContent from '../components/DialogContent/DialogContent';
import NanoDialogScrollArea from '../components/DialogScrollArea/DialogScrollArea';
import NanoDialogTitle from '../components/DialogTitle/DialogTitle';
import NanoDivider from '../components/Divider/Divider';
import NanoFab from '../components/Fab/Fab';
import NanoIconButton from '../components/IconButton/IconButton';
import NanoImage from '../components/Image/Image';
import NanoModal from '../components/modal/Modal';
import NanoProgressbar from '../components/Progressbar/Progressbar';
import NanoRadioButton from '../components/RadioButton/RadioButton';
import NanoSearchBar from '../components/searchbar/SearchBar';
import NanoSwitch from '../components/Switch/Switch';
import NanoText from '../components/Text/Text';
import NanoTextInput from '../components/TextInput/TextInput';
import NanoVideoPlayer from '../components/videoplayer/VideoPlayer';
import NanoYoutubePlayer from '../components/youtube/YoutubePlayer';
import {getPlatform} from '../modules/platform/platform';
import NANO from '../utils/Constants';
import {
  checkNameAndRenderCustomComponent,
  getInterceptedFunctionProps,
  getViewItems,
  modifyElemObjAsPerTheme,
  onElementLoaded,
} from '../utils/Utilities';
import {GetContextProvider} from '../context/DataContext';

const getElementAsPerComponent = ({
  elemOb,
  index = null,

  recyclerListViewFunctionProps,
  propParameters,
  onPressCallBack,
  getUi,
  customComponents,
  uniqueKey,
  themes,
}) => {
  const context = GetContextProvider();
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
      elemObjAfterThemesSet['hide'] === true
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

    // const heightWeightFormattedElemObj =
    //   heightAndWidthFormatterForComponentObj(elemObjAfterThemesSet);

    let funProps = null;

    if (recyclerListViewFunctionProps != null) {
      funProps = recyclerListViewFunctionProps;
      // this has to be for the parent view of the itemview. Its children wont have recyclerListViewFunctionProps

      // console.log('funccc', funProps !== {});
    } else {
      funProps = getInterceptedFunctionProps({
        eleObject: elemObjAfterThemesSet,
        props: {
          moduleParams: {...propParameters, theme: context},

          setUi: onPressCallBack,
          getUi: getUi,
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
        // const gggg = elementProps['onPress'];
        // console.log('BUTTTon', gggg(), gggg);
        return (
          <NanoButton
            elementProps={elementProps}
            key={'button' + index}
            onElementLoaded={onElementLoad}
            getViewItems={renderChildren}
          />
        );

      case NANO.TEXT:
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
            key={'avatar text' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.BADGE:
        return (
          <Badge
            key={'badge text' + index}
            getViewItems={renderChildren}
            elementProps={elementProps}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.CHECKBOX:
        // const ddd = elementProps['onPress'];
        // console.log('elel', ddd(), ddd);

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
            key={'progress bar' + index}
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
            key={'radio button' + index}
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
            key={'CARD' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD_CONTENT:
        return (
          <NanoCardContent
            key={'CARD_CONTENT' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD_ACTION:
        return (
          <NanoCardActions
            key={'CARD_ACTIONS' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD_TITLE:
        return (
          <NanoCardTitle
            key={'CARD_title' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.CARD_COVER:
        return (
          <NanoCardCover
            key={'CARD_cover' + index}
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
            key={'dialog_ACTIONS' + index}
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
            key={'videoplayer' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );
      case NANO.YOUTUBE_PLAYER:
        return (
          <NanoYoutubePlayer
            key={'youtubeplayer' + index}
            elementProps={elementProps}
            getViewItems={renderChildren}
            onElementLoaded={onElementLoad}
          />
        );

      case NANO.VIEW:
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
            })}
          </View>
        );

      default:
        // console.log('custome comp', elementProps, onElementLoaded);

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
  return <Text key={'error' + index}> {' Error   jj'} </Text>;
};

export default getElementAsPerComponent;
