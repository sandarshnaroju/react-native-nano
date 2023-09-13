import {Dimensions, Platform, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Text} from 'react-native-paper';
import React from 'react';
import NanoActivityIndicator from '../components/ActivityIndicator';
import NanoAvatarImage from '../components/AvatarImage';
import NanoAvatarText from '../components/AvatarText/AvatarText';
import NanoAvatarIcon from '../components/AvatarIcon/AvatarIcon';
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
import NanoSearchBar from '../components/searchbar/SearchBar';
import NanoModal from '../components/modal/Modal';
import NANO from '../utils/Constants';
import {
  checkNameAndRenderCustomComponent,
  executeAFunction,
  heightAndWidthFormatterForComponentObj,
} from '../utils/Utilities';
import {requestDataFromUrlAsPerNetworkData} from '../modules/network/Network';
import {getPlatform} from '../modules/platform/platform';

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
  requestDataFromUrlAsPerNetworkData({
    requestType:
      elemObj['network']['fetch'] != null
        ? 'fetch'
        : elemObj['network']['axios'] != null
        ? 'axios'
        : '',
    requestObj: elemObj['network'],
    props,
  });
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
    let func = null;
    if (
      props != null &&
      props['logicObject'] != null &&
      props['logicObject'][eleObject[propKey]] != null
    ) {
      func = props['logicObject'][eleObject[propKey]];
    } else {
      func = eleObject[propKey];
    }

    if (
      eleObject != null &&
      eleObject['network'] != null &&
      eleObject['network']['action'] === 'onPress'
    ) {
      funArray[propKey] = withExtraParams(() => {
        onPressNetwork(func, props, eleObject);
      }, props);
      // funArray[propKey] = withExtraParams(eleObject[propKey], props);
    } else {
      funArray[propKey] = withExtraParams(func, props);
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
  const getElementAsPerComponent = (elemOb, index = null, onElementLoaded) => {
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
      // const heightWeightFormattedElemObj =
      //   heightAndWidthFormatterForComponentObj(elemOb);

      let funProps = null;

      if (recyclerListViewFunctionProps != null) {
        funProps = recyclerListViewFunctionProps;
        // console.log('funccc', funProps !== {});
      } else {
        funProps = getInterceptedFunctionProps({
          eleObject: elemOb,
          props: {
            moduleParams: propParameters,

            // itemJson: elemOb,
            // listData,
            // itemData: item,
            // index: listViewIndex,
            setUi: onPressCallBack,
            getUi: getUi,
          },
        });
      }
      const elementProps = {
        ...elemOb,
        ...funProps,
      };

      // ! onPressCallback is a function that takes the complete JSON data and setstates it.
      // ! Use this funtion to modify UI.
      switch (elemOb['component']) {
        case NANO.BUTTON:
          return (
            <NanoButton
              elementProps={elementProps}
              key={'button' + index}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );

        case NANO.TEXT:
          return (
            <NanoText
              key={'text' + index}
              elementProps={elementProps}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.MODAL:
          return (
            <NanoModal
              key={'text' + index}
              elementProps={elementProps}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.ACTIVITY_INDICATOR:
          return (
            <NanoActivityIndicator
              key={'activityindicator' + index}
              elementProps={elementProps}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.IMAGE:
          return (
            <NanoImage
              elementProps={elementProps}
              key={'image' + index}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );

        case NANO.ICON_BUTTON:
          return (
            <NanoIconButton
              elementProps={elementProps}
              key={'iconbutton' + index}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.AVATAR_ICON:
          return (
            <NanoAvatarIcon
              elementProps={elementProps}
              key={'avatarIcon' + index}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.AVATAR_IMAGE:
          return (
            <NanoAvatarImage
              elementProps={elementProps}
              key={'avatarimage' + index}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.AVATAR_TEXT:
          return (
            <NanoAvatarText
              key={'avatar text' + index}
              elementProps={elementProps}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.BADGE:
          return (
            <Badge
              key={'badge text' + index}
              getViewItems={getViewItems}
              elementProps={elementProps}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.CHECKBOX:
          return (
            <NanoCheckBox
              key={'checkbox' + index}
              elementProps={elementProps}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.CHIP:
          return (
            <NanoChip
              elementProps={elementProps}
              key={'chip' + index}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.FAB:
          return (
            <NanoFab
              key={'fab' + index}
              elementProps={elementProps}
              onElementLoaded={onElementLoaded}
              getViewItems={getViewItems}
            />
          );
        case NANO.PROGRESS_BAR:
          return (
            <NanoProgressbar
              key={'progress bar' + index}
              elementProps={elementProps}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.RADIO_BUTTON:
          return (
            <NanoRadioButton
              elemOb={elemOb}
              getViewItems={getViewItems}
              key={'radio button' + index}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.SWITCH:
          return (
            <NanoSwitch
              elementProps={elementProps}
              key={'switch' + index}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.TEXT_INPUT:
          return (
            <NanoTextInput
              elementProps={elementProps}
              key={'textinput' + index}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.SEARCH_BAR:
          return (
            <NanoSearchBar
              getViewItems={getViewItems}
              elementProps={elementProps}
              key={'searchbar' + index}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.BANNER:
          return (
            <NanoBanner
              key={'banner' + index}
              getViewItems={getViewItems}
              elementProps={elementProps}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.DIVIDER:
          return (
            <NanoDivider
              elementProps={elementProps}
              key={'divider' + index}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );
        case NANO.CARD:
          return (
            <NanoCard
              key={'CARD' + index}
              elementProps={elementProps}
              getViewItems={getViewItems}
              onElementLoaded={onElementLoaded}
            />
          );

        case NANO.VIEW:
          if (elemOb['onPress'] != null) {
            return (
              <TouchableOpacity
                key={'TouchableOpacity' + index}
                {...elementProps['props']}
                {...elementProps}>
                {getViewItems(elemOb['content'], false, onElementLoaded)}
              </TouchableOpacity>
            );
          }

          return (
            <View
              key={'view' + index}
              {...elementProps['props']}
              {...elementProps}>
              {getViewItems(elemOb['content'], true, onElementLoaded)}
            </View>
          );

        default:
          const custom = checkNameAndRenderCustomComponent({
            componentName: elemOb['component'],
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
            moduleParams: propParameters,
            // itemJson: elementObject,
            // listData,
            // itemData: item,
            // index: listViewIndex,
            setUi: onPressCallBack,
            getUi: getUi,
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
    uniqueKey,
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
