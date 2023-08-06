import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Text} from 'react-native-paper';
import React from 'react';
import NanoActivityIndicator from '../components/ActivityIndicator';
import NanoAvatarImage from '../components/AvatarImage';
import NanoAvatarText from '../components/AvatarText/AvatarText';
import Badge from '../components/Badge/Badge';
import NanoBanner from '../components/Banner/Banner';
import NanoButton from '../components/Button/Button';
import NanoCard from '../components/Card/Card';
import NanoCheckBox from '../components/CheckBox/CheckBox';
import NanoChip from '../components/Chip/Chip';
import NanoDivider from '../components/Divider/Divider';
import NanoFab from '../components/Fab/Fab';
import NanoIconButton from '../components/IconButton/IconButton';
import NanoImage from '../components/Image/Image';
import NanoProgressbar from '../components/Progressbar/Progressbar';
import NanoRadioButton from '../components/RadioButton/RadioButton';
import NanoSwitch from '../components/Switch/Switch';
import NanoText from '../components/Text/Text';
import NanoTextInput from '../components/TextInput/TextInput';
import NANO from '../utils/Constants';
import {
  executeAFunction,
  heightAndWidthFormatterForComponentObj,
} from '../utils/Utilities';
import {requestDataFromUrlAsPerNetworkData} from '../modules/network/Network';
import {getPlatform} from '../modules/platform/platform';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const WINDOW_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const withExtraParams = (originalFn, extraParams, onPressCallBack) => {
  return function (...args) {
    const newArgs = {
      methodValues: args,
      ...extraParams,
    };
    executeAFunction(originalFn, newArgs);
  };
};
const dummy = (props, elemObj) => {
  executeAFunction(elemObj['network']['onSuccess'], props);
};

const onPressNetwork = (onPressFunc, props, eleObject) => {
  executeAFunction(onPressFunc, props);
  return dummy(props, eleObject);
};

const getInterceptedFunctionProps = ({eleObject, props, onPressCallBack}) => {
  const funArray = {};

  const functionWithOnKeys = Object.keys(eleObject).filter(
    propKey => propKey.indexOf('on') === 0,
  );

  if (
    eleObject != null &&
    eleObject['network'] != null &&
    eleObject['network']['action'] === 'onPress'
  ) {
    functionWithOnKeys.push('onPress');
  }

  functionWithOnKeys.forEach(propKey => {
    // console.log('sssss', eleObject['component']);

    if (
      eleObject != null &&
      eleObject['network'] != null &&
      eleObject['network']['action'] === 'onPress'
    ) {
      funArray[propKey] = withExtraParams(() => {
        onPressNetwork(eleObject[propKey], props, eleObject);
      }, props);
      // funArray[propKey] = withExtraParams(eleObject[propKey], props);
    } else {
      funArray[propKey] = withExtraParams(eleObject[propKey], props);
    }
  });

  return funArray;
};

function UniversalElement({
  elemObj,
  onPress,
  onLongPress,
  navigation,
  mergeDataAsProps,
  customComponents,
  parent,
  uniqueKey,

  logicObject,
  propParameters,
  onPressCallBack,
  recyclerListViewFunctionProps,
  listData,
  item,
  listViewIndex,
  getUi,
}) {
  const getElementAsPerComponent = (
    elemOb,
    index = null,
    isOnPressAllowed,
    onElementLoaded,
  ) => {
    if (elemOb != null && elemOb['component'] != null) {
      if (elemOb['hide'] != null && elemOb['hide'] === true) {
        return null;
      }
      if (
        elemOb['platform'] != null &&
        elemOb['platform'].length > 0 &&
        !elemOb['platform'].includes(getPlatform())
      ) {
        return null;
      }
      const heightWeightFormattedElemObj =
        heightAndWidthFormatterForComponentObj(elemOb);
      if (elemOb != null && elemOb['component'] === 'icon_button') {
        // console.log('helll0', elemOb['component']);
      }
      let funProps = null;
      if (recyclerListViewFunctionProps) {
        funProps = recyclerListViewFunctionProps;
      } else {
        funProps = getInterceptedFunctionProps({
          eleObject: elemOb,
          props: {
            logicObject,
            ...propParameters,
            itemJson: elemOb,
            listData,
            itemData: item,
            index: listViewIndex,
            setUi: onPressCallBack,
            getUi: getUi,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            screenHeight: SCREEN_HEIGHT,
            screenWidth: SCREEN_WIDTH,
          },
        });
      }
      // ! onPressCallback is a function that takes the complete JSON data and setstates it.
      // ! Use this funtion to modify UI.

      switch (elemOb['component']) {
        case NANO.BUTTON:
          return (
            <NanoButton
              key={'button' + index}
              elemOb={elemOb}
              isOnPressAllowed={isOnPressAllowed}
              onLongPress={onLongPress}
              funProps={funProps}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.TEXT:
          return (
            <NanoText
              key={'text' + index}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              isOnPressAllowed={isOnPressAllowed}
              onLongPress={onLongPress}
              funProps={funProps}
              index={index}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.ACTIVITY_INDICATOR:
          return (
            <NanoActivityIndicator
              key={'activityindicator' + index}
              elemOb={elemOb}
              funProps={funProps}
              index={index}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.IMAGE:
          return (
            <NanoImage
              elemOb={elemOb}
              funProps={funProps}
              index={index}
              isOnPressAllowed={isOnPressAllowed}
              onPress={onPress}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              key={'image' + index}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.ICON_BUTTON:
          return (
            <NanoIconButton
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              elemOb={elemOb}
              isOnPressAllowed={isOnPressAllowed}
              key={'iconbutton' + index}
              onPress={onPress}
              onElementLoaded={onElementLoaded}
              funProps={funProps}
            />
          );
        case NANO.AVATAR_IMAGE:
          return (
            <NanoAvatarImage
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              key={'avatarimage' + index}
              elemOb={elemOb}
              funProps={funProps}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.AVATAR_TEXT:
          return (
            <NanoAvatarText
              key={'avatar text' + index}
              elemOb={elemOb}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              funProps={funProps}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.BADGE:
          return (
            <Badge
              key={'badge text' + index}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              funProps={funProps}
              elemOb={elemOb}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.CHECKBOX:
          return (
            <NanoCheckBox
              key={'checkbox' + index}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              elemOb={elemOb}
              isOnPressAllowed={isOnPressAllowed}
              onPress={onPress}
              funProps={funProps}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.CHIP:
          return (
            <NanoChip
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              isOnPressAllowed={isOnPressAllowed}
              onPress={onPress}
              elemOb={elemOb}
              key={'chip' + index}
              funProps={funProps}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.FAB:
          return (
            <NanoFab
              key={'fab' + index}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              funProps={funProps}
              elemOb={elemOb}
              isOnPressAllowed={isOnPressAllowed}
              onPress={onPress}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.PROGRESS_BAR:
          return (
            <NanoProgressbar
              key={'progress bar' + index}
              elemOb={elemOb}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              funProps={funProps}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.RADIO_BUTTON:
          return (
            <NanoRadioButton
              elemOb={elemOb}
              isOnPressAllowed={isOnPressAllowed}
              funProps={funProps}
              onPress={onPress}
              key={'radio button' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.SWITCH:
          return (
            <NanoSwitch
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              onPress={onPress}
              key={'switch' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              funProps={funProps}
              elemOb={elemOb}
              isOnPressAllowed={isOnPressAllowed}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.TEXT_INPUT:
          // console.log('funnn text input', funProps);

          return (
            <NanoTextInput
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              onPress={onPress}
              elemOb={elemOb}
              funProps={funProps}
              isOnPressAllowed={isOnPressAllowed}
              key={'textinput' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.BANNER:
          return (
            <NanoBanner
              funProps={funProps}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              elemOb={elemOb}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.DIVIDER:
          return (
            <NanoDivider
              funProps={funProps}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              key={'divider' + index}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.CARD:
          return (
            <NanoCard
              key={'CARD' + index}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              isOnPressAllowed={isOnPressAllowed}
              onPress={onPress}
              funProps={funProps}
              elemOb={elemOb}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.VIEW:
          // console.log('touahah', elemOb['onClick']);

          if (elemOb['onClick'] != null) {
            return (
              <TouchableOpacity
                key={'TouchableOpacity' + index}
                onPress={
                  isOnPressAllowed
                    ? () => {
                        onPress({itemJson: elemOb});
                      }
                    : null
                }
                {...heightWeightFormattedElemObj['props']}>
                {getViewItems(elemOb['content'], false, onElementLoaded)}
              </TouchableOpacity>
            );
          }

          return (
            <View
              key={'view' + index}
              {...heightWeightFormattedElemObj['props']}
              {...funProps}>
              {getViewItems(elemOb['content'], true, onElementLoaded)}
            </View>
          );

        default:
          // const custom = checkNameAndRenderCustomComponent({
          //   componentName: elemOb['component'],
          //   compsArray: customComponents,
          // });
          // if (custom) {
          //   return custom;
          // }

          return;
      }
    }
    return <Text key={'error' + index}> {' Error'} </Text>;
  };

  const getViewItems = (content, onPressAllowed, onElementLoaded) => {
    const elements = [];
    content.forEach((elemet, index) => {
      // const elementsInsideViewPropFunctions = getInterceptedFunctionProps({
      //   eleObject: elemet,
      //   props: {elemet, logicObject, ...propParameters},
      //   onPressCallBack,
      // });
      // console.log('contentnt', elemet);
      const oitem = getElementAsPerComponent(
        elemet,
        index + uniqueKey,
        onPressAllowed,
        onElementLoaded,
      );

      elements.push(oitem);
    });
    return elements;
  };

  const fetchDataBasedOnNetworkObject = elementObject => {
    if (elementObject != null && elementObject['network'] != null) {
      if (elementObject['network']['action'] === 'onStart') {
        requestDataFromUrlAsPerNetworkData({
          requestType:
            elementObject['network']['fetch'] != null
              ? 'fetch'
              : elementObject['network']['axios'] != null
              ? 'axios'
              : '',
          requestObj: elementObject['network'],
          props: {
            logicObject,
            ...propParameters,
            itemJson: elementObject,
            listData,
            itemData: item,
            index: listViewIndex,
            setUi: onPressCallBack,
            getUi: getUi,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            screenHeight: SCREEN_HEIGHT,
            screenWidth: SCREEN_WIDTH,
          },
        });
      }
    }
  };

  const onElementLoaded = loadedElemObject => {
    // console.log('onElement loaded', loadedElemObject['component']);
    fetchDataBasedOnNetworkObject(loadedElemObject);
  };

  const displayItem = getElementAsPerComponent(
    elemObj,
    null,
    true,
    onElementLoaded,
  );
  if (elemObj != null && elemObj['animation']) {
    return (
      <Animatable.View {...elemObj['animation']}>{displayItem}</Animatable.View>
    );
  }

  return displayItem;
}

export default UniversalElement;
