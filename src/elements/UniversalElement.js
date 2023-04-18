import {Image, TouchableOpacity, View} from 'react-native';
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
import {executeAFunction} from '../utils/Utilities';

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
  Object.keys(eleObject)
    .filter(propKey => propKey.indexOf('on') === 0)
    .forEach(propKey => {
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
}) {
  // console.log('starttt', onPressCallBack);

  const getElementAsPerComponent = (elemOb, index = null, isOnPressAllowed) => {
    if (elemOb != null && elemOb['component'] != null) {
      if (elemOb['hide'] == true) {
        return null;
      }
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
          },
          // onPressCallBack: onPressCallBack,
        });
      }
      // ! onPressCallback is a function that takes the complete JSON data and setstates it.
      // ! Use this funtion to modify UI.

      switch (elemOb['component']) {
        case NANO.BUTTON:
          // console.log('funnn button', onPress);

          return (
            <Button
              {...elemOb['props']}
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
          return (
            <Text
              key={'text' + index}
              {...elemOb['props']}
              style={elemOb['props'] != null ? elemOb['props']['style'] : null}
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              // style={{
              //   textDecorationLine: 'line-through',
              //   borderWidth: 1,
              //   borderColor: 'red',
              // }}

              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}>
              {' '}
              {elemOb['value']}{' '}
            </Text>
          );

        case NANO.ACTIVITY_INDICATOR:
          return (
            <ActivityIndicator
              {...elemOb['props']}
              style={elemOb['props'] != null ? elemOb['props']['style'] : null}
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
                <Image {...elemOb['props']} {...funProps} source={imgSource} />
              </TouchableOpacity>
            );
          } else {
            return null;
          }

        case NANO.AVATAR_ICON:
          // console.log('aaaaa', elemOb);
          const styless =
            elemOb != null &&
            elemOb['props'] != null &&
            elemOb['props']['style'] != null &&
            typeof elemOb['props']['style'] === 'object'
              ? elemOb['props']['style']
              : {};

          return (
            <Avatar.Icon
              {...elemOb['props']}
              // style={elemOb['props'] != null ? elemOb['props']['style'] : null}
              icon={elemOb['value']}
              key={'avataricon' + index}
              style={[{fontFamily: 'FontAwesome'}, {...styless}]}
              {...funProps}
            />
          );
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
              {...elemOb['props']}
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
              {...elemOb['props']}
              source={{uri: elemOb['value']}}
              key={'avatarimage' + index}
              {...funProps}
            />
          );

        case NANO.AVATAR_TEXT:
          return (
            <Avatar.Text
              key={'avatar text' + index}
              {...elemOb['props']}
              label={elemOb['value']}
              {...funProps}
            />
          );

        case NANO.BADGE:
          return (
            <Badge
              key={'badge text' + index}
              {...elemOb['props']}
              {...funProps}>
              {elemOb['value']}
            </Badge>
          );

        case NANO.CHECKBOX:
          // console.log('checkk', funProps);

          return (
            <Checkbox
              key={'checkbox' + index}
              {...elemOb['props']}
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
              {...elemOb['props']}
              style={elemOb['props'] != null ? elemOb['props']['style'] : null}
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
              {...elemOb['props']}
              icon={elemOb['value']}
              style={elemOb['props'] != null ? elemOb['props']['style'] : null}
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
              {...elemOb['props']}
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
              {...elemOb['props']}
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
              {...elemOb['props']}
              onPress={
                isOnPressAllowed
                  ? () => {
                      onPress({itemJson: elemOb});
                    }
                  : null
              }
              value={elemOb['value']}
              key={'textinput' + index}
              onLongPress={isOnPressAllowed ? onLongPress : null}
              {...funProps}
            />
          );
        case NANO.BANNER:
          return (
            <Banner {...elemOb['props']} {...funProps}>
              {elemOb['value']}
            </Banner>
          );

        case NANO.DIVIDER:
          return (
            <Divider
              key={'divider' + index}
              {...elemOb['props']}
              {...funProps}
            />
          );
        case NANO.CARD:
          // console.log('cardd', Object.keys(elemOb));

          return (
            <Card key={'CARD' + index} {...elemOb['props']} {...funProps}>
              {getViewItems(elemOb['content'], true)}
            </Card>
          );

        case NANO.VIEW:
          // console.log('touahah', elemOb['onClick']);

          if (elemOb['onClick'] != null) {
            return (
              <TouchableOpacity
                key={'TouchableOpacity' + index}
                onPress={() => {
                  console.log('helll');

                  onPress();
                }}
                {...elemOb['props']}>
                {getViewItems(elemOb['content'], false)}
              </TouchableOpacity>
            );
          }

          return (
            <View key={'view' + index} {...elemOb['props']} {...funProps}>
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

      const item = getElementAsPerComponent(
        elemet,
        index + uniqueKey,
        onPressAllowed,
      );
      elements.push(item);
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
