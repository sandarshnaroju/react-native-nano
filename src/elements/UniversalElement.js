import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import React from 'react';
import {
  ActivityIndicator,
  Avatar,
  Badge,
  Banner,
  Button,
  Checkbox,
  Chip,
  Divider,
  FAB,
  ProgressBar,
  RadioButton,
  Switch,
  Text,
  TextInput,
  IconButton,
  Card,
} from 'react-native-paper';
import NANO from '../utils/Constants';
import {
  executeAFunction,
  heightAndWidthFormatter,
  heightAndWidthFormatterForComponentObj,
} from '../utils/Utilities';
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

const getInterceptedFunctionProps = ({eleObject, props, onPressCallBack}) => {
  const funArray = {};

  const functionWithOnKeys = Object.keys(eleObject).filter(
    propKey => propKey.indexOf('on') === 0,
  );

  functionWithOnKeys.forEach(propKey => {
    funArray[propKey] = withExtraParams(
      eleObject[propKey],
      props,
      // onPressCallBack,
    );
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
  getElement,
}) {
  // console.log('universal ellemetn', getElement);

  const getElementAsPerComponent = (elemOb, index = null, isOnPressAllowed) => {
    if (elemOb != null && elemOb['component'] != null) {
      if (elemOb['hide'] != null && elemOb['hide'] === true) {
        return null;
      }
      const heightWeightFormattedElemObj =
        heightAndWidthFormatterForComponentObj(elemOb);
      let funProps = null;
      // console.log('PROSPPSPS', propParameters['uiElements']['v1'][1]);
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
            getElement: getElement,
            windowHeight: WINDOW_HEIGHT,
            windowWidth: WINDOW_WIDTH,
            screenHeight: SCREEN_HEIGHT,
            screenWidth: SCREEN_WIDTH,
          },
          // onPressCallBack: onPressCallBack,
        });
      }
      // ! onPressCallback is a function that takes the complete JSON data and setstates it.
      // ! Use this funtion to modify UI.
      // const dimensionallyFormattedProps = heightAndWidthFormatter(
      //   elemOb['props'],
      // );

      // console.log('ddddd', dimensionallyFormattedProps);

      switch (elemOb['component']) {
        case NANO.BUTTON:
          // console.log('funnn button', onPress);

          return (
            <Button
              // {...dimensionallyFormattedProps}
              // onPress={
              //   isOnPressAllowed
              //     ? () => {
              //         console.log('clickee', onPress);

              //         onPress({itemJson: elemOb});
              //       }
              //     : null
              // }
              key={'button' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}>
              {elemOb['value']}
            </Button>
          );

        case NANO.TEXT:
          // console.log(
          //   'valuuee',
          //   heightWeightFormattedElemObj['props']['style']['height'],

          //   typeof heightWeightFormattedElemObj['props']['style']['height'],
          // );

          return (
            <Text
              key={'text' + index}
              {...heightWeightFormattedElemObj['props']}
              style={
                heightWeightFormattedElemObj != null &&
                heightWeightFormattedElemObj['props'] != null
                  ? heightWeightFormattedElemObj['props']['style']
                  : null
              }
              // style={{
              //   fontSize: eval(strigifiedIIF),
              // }}
              // onPress={
              //   isOnPressAllowed
              //     ? () => {
              //         console.log('hee');

              //         onPress({itemJson: heightWeightFormattedElemObj});
              //       }
              //     : null
              // }
              // style={{
              //   textDecorationLine: 'line-through',
              //   borderWidth: 1,
              //   borderColor: 'red',
              // }}

              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}>
              {' '}
              {heightWeightFormattedElemObj['value']}{' '}
            </Text>
          );

        case NANO.ACTIVITY_INDICATOR:
          return (
            <ActivityIndicator
              {...heightWeightFormattedElemObj['props']}
              style={
                heightWeightFormattedElemObj != null &&
                heightWeightFormattedElemObj['props'] != null
                  ? heightWeightFormattedElemObj['props']['style']
                  : null
              }
              animating={elemOb['value']}
              key={'activityindicator' + index}
              {...funProps}
            />
          );
        case NANO.IMAGE:
          const imgSource =
            elemOb != null && elemOb['value'] != null
              ? elemOb['value'].indexOf('http') == 0
                ? {uri: elemOb['value']}
                : elemOb['value']
              : null;
          if (imgSource) {
            return (
              <TouchableOpacity
                key={'image' + index}
                onPress={
                  isOnPressAllowed
                    ? () => {
                        onPress({itemJson: elemOb});
                      }
                    : null
                }
                {...funProps}>
                <Image
                  {...heightWeightFormattedElemObj['props']}
                  {...funProps}
                  source={imgSource}
                />
              </TouchableOpacity>
            );
          } else {
            return null;
          }

        // case NANO.AVATAR_ICON:
        //   // console.log('aaaaa', elemOb);
        //   const styless =
        //     elemOb != null &&
        //     dimensionallyFormattedProps != null &&
        //     dimensionallyFormattedProps['style'] != null &&
        //     typeof dimensionallyFormattedProps['style'] === 'object'
        //       ? dimensionallyFormattedProps['style']
        //       : {};

        //   return (
        //     <Avatar.Icon
        //       // {...dimensionallyFormattedProps}
        //       // style={dimensionallyFormattedProps != null ? dimensionallyFormattedProps['style'] : null}
        //       icon={elemOb['value']}
        //       key={'avataricon' + index}
        //       style={[{fontFamily: 'FontAwesome'}, {...styless}]}
        //       {...funProps}
        //     />
        //   );
        case NANO.ICON_BUTTON:
          // console.log(
          //   'ssssss',
          //   elemOb,
          //   typeof funProps['onPress'],
          //   onPressCallBack,
          // );
          // console.log('funppr', funProps);

          return (
            <IconButton
              {...heightWeightFormattedElemObj['props']}
              icon={elemOb['value']}
              key={'iconbutton' + index}
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              {...funProps}
            />
          );
        case NANO.AVATAR_IMAGE:
          return (
            <Avatar.Image
              {...heightWeightFormattedElemObj['props']}
              source={{uri: elemOb['value']}}
              key={'avatarimage' + index}
              {...funProps}
            />
          );

        case NANO.AVATAR_TEXT:
          return (
            <Avatar.Text
              key={'avatar text' + index}
              {...heightWeightFormattedElemObj['props']}
              label={elemOb['value']}
              {...funProps}
            />
          );

        case NANO.BADGE:
          return (
            <Badge
              key={'badge text' + index}
              {...heightWeightFormattedElemObj['props']}
              {...funProps}>
              {elemOb['value']}
            </Badge>
          );

        case NANO.CHECKBOX:
          // console.log('checkk', funProps);

          return (
            <Checkbox
              key={'checkbox' + index}
              {...heightWeightFormattedElemObj['props']}
              status={
                elemOb['value'] != null
                  ? elemOb['value']
                    ? 'checked'
                    : 'unchecked'
                  : 'indeterminate'
              }
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}
            />
          );
        case NANO.CHIP:
          return (
            <Chip
              {...heightWeightFormattedElemObj['props']}
              style={
                heightWeightFormattedElemObj != null &&
                heightWeightFormattedElemObj['props'] != null
                  ? heightWeightFormattedElemObj['props']['style']
                  : null
              }
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              key={'chip' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}>
              {elemOb['value']}
            </Chip>
          );
        case NANO.FAB:
          return (
            <FAB
              key={'fab' + index}
              {...heightWeightFormattedElemObj['props']}
              // icon={elemOb['value']}
              icon={'plus'}
              style={
                heightWeightFormattedElemObj != null &&
                heightWeightFormattedElemObj['props'] != null
                  ? heightWeightFormattedElemObj['props']['style']
                  : null
              }
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}
            />
          );
        case NANO.PROGRESS_BAR:
          return (
            <ProgressBar
              key={'progress bar' + index}
              progress={elemOb['value']}
              {...heightWeightFormattedElemObj['props']}
              {...funProps}
            />
          );

        case NANO.RADIO_BUTTON:
          return (
            <RadioButton
              value="first"
              status={elemOb['value'] ? 'checked' : 'unchecked'}
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              key={'radio button' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}
            />
          );

        case NANO.SWITCH:
          return (
            <Switch
              {...heightWeightFormattedElemObj['props']}
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              key={'switch' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}
            />
          );
        case NANO.TEXT_INPUT:
          // console.log('funnn text input', funProps);

          return (
            <TextInput
              {...heightWeightFormattedElemObj['props']}
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              // style={{}}
              scrollEnabled={false}
              value={elemOb['value']}
              key={'textinput' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}
            />
          );
        case NANO.BANNER:
          return (
            <Banner {...heightWeightFormattedElemObj['props']} {...funProps}>
              {elemOb['value']}
            </Banner>
          );

        case NANO.DIVIDER:
          return (
            <Divider
              key={'divider' + index}
              {...heightWeightFormattedElemObj['props']}
              {...funProps}
            />
          );
        case NANO.CARD:
          // console.log('cardd', Object.keys(elemOb));

          return (
            <Card
              key={'CARD' + index}
              {...heightWeightFormattedElemObj['props']}
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              {...funProps}>
              {getViewItems(elemOb['content'], true)}
            </Card>
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

      const oitem = getElementAsPerComponent(
        elemet,
        index + uniqueKey,
        onPressAllowed,
      );
      elements.push(oitem);
    });
    return elements;
  };
  const displayItem = getElementAsPerComponent(elemObj, null, true);
  if (elemObj != null && elemObj['animation']) {
    return (
      <Animatable.View {...elemObj['animation']}>{displayItem}</Animatable.View>
    );
  }

  return displayItem;
}

export default UniversalElement;
