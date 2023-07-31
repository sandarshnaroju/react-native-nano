import {Dimensions, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Text} from 'react-native-paper';
import React, {useEffect} from 'react';
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
  const getElementAsPerComponent = (elemOb, index = null, isOnPressAllowed) => {
    if (elemOb != null && elemOb['component'] != null) {
      if (elemOb['hide'] != null && elemOb['hide'] === true) {
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
            />
          );

        case NANO.AVATAR_TEXT:
          return (
            <NanoAvatarText
              key={'avatar text' + index}
              elemOb={elemOb}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              funProps={funProps}
            />
          );

        case NANO.BADGE:
          return (
            <Badge
              key={'badge text' + index}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              funProps={funProps}
              elemOb={elemOb}
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
            />
          );
        case NANO.PROGRESS_BAR:
          return (
            <NanoProgressbar
              key={'progress bar' + index}
              elemOb={elemOb}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              funProps={funProps}
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
            />
          );
        case NANO.BANNER:
          return (
            <NanoBanner
              funProps={funProps}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              elemOb={elemOb}
            />
          );

        case NANO.DIVIDER:
          return (
            <NanoDivider
              funProps={funProps}
              heightWeightFormattedElemObj={heightWeightFormattedElemObj}
              key={'divider' + index}
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
                {getViewItems(elemOb['content'], false)}
              </TouchableOpacity>
            );
          }

          return (
            <View
              key={'view' + index}
              {...heightWeightFormattedElemObj['props']}
              {...funProps}>
              {getViewItems(elemOb['content'], true)}
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

  const getViewItems = (content, onPressAllowed) => {
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
      );

      elements.push(oitem);
    });
    return elements;
  };

  useEffect(() => {
    if (elemObj != null && elemObj['network'] != null) {
      if (elemObj['network']['action'] === 'onStart') {
        requestDataFromUrlAsPerNetworkData({
          requestType:
            elemObj['network']['fetch'] != null
              ? 'fetch'
              : elemObj['network']['axios'] != null
              ? 'axios'
              : '',
          requestObj: elemObj['network'],
          props: {
            logicObject,
            ...propParameters,
            itemJson: elemObj,
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
  }, []);

  const displayItem = getElementAsPerComponent(elemObj, null, true);
  if (elemObj != null && elemObj['animation']) {
    return (
      <Animatable.View {...elemObj['animation']}>{displayItem}</Animatable.View>
    );
  }

  return displayItem;
}

export default UniversalElement;
