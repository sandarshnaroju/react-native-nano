import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';

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
} from 'react-native-paper';
import NANO from '../utils/Constants';

function UniversalElement({
  elemObj,
  onPress,
  onLongPress,
  navigation,
  mergeDataAsProps,
  customComponents,
}) {
  const getElementAsPerComponent = (elemOb, index = null, isOnPressAllowed) => {
    if (elemOb != null && elemOb['component'] != null) {
      if (elemOb['hide'] == true) {
        return null;
      }
      switch (elemOb['component']) {
        case NANO.BUTTON:
          return (
            <Button
              {...elemOb['props']}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}>
              {elemOb['value']}
            </Button>
          );

        case NANO.TEXT:
          return (
            <Text
              key={'text' + index}
              {...elemOb['props']}
              style={elemOb['props'] != null ? elemOb['props']['style'] : null}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}>
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
            />
          );
        case NANO.AVATAR_ICON:
          return (
            <Avatar.Icon
              {...elemOb['props']}
              // style={elemOb['props'] != null ? elemOb['props']['style'] : null}
              icon={elemOb['value']}
              style={{fontFamily: 'FontAwesome'}}
            />
          );

        case NANO.AVATAR_IMAGE:
          return (
            <Avatar.Image
              {...elemOb['props']}
              source={{uri: elemOb['value']}}
            />
          );

        case NANO.AVATAR_TEXT:
          return <Avatar.Text {...elemOb['props']} label={elemOb['value']} />;

        case NANO.BADGE:
          return <Badge {...elemOb['props']}>{elemOb['value']}</Badge>;

        case NANO.CHECKBOX:
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
              // status={'indeterminate'}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}
            />
          );
        case NANO.CHIP:
          return (
            <Chip
              {...elemOb['props']}
              style={elemOb['props'] != null ? elemOb['props']['style'] : null}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}>
              {elemOb['value']}
            </Chip>
          );
        case NANO.FAB:
          return (
            <FAB
              {...elemOb['props']}
              icon={elemOb['value']}
              style={elemOb['props'] != null ? elemOb['props']['style'] : null}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}
            />
          );
        case NANO.PROGRESS_BAR:
          return (
            <ProgressBar progress={elemOb['value']} {...elemOb['props']} />
          );

        case NANO.RADIO_BUTTON:
          return (
            <RadioButton
              value="first"
              status={elemOb['value'] ? 'checked' : 'unchecked'}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}
            />
          );

        case NANO.SWITCH:
          return (
            <Switch
              {...elemOb['props']}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}
            />
          );
        case NANO.TEXT_INPUT:
          return (
            <TextInput
              {...elemOb['props']}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={isOnPressAllowed ? onLongPress : null}
            />
          );
        case NANO.BANNER:
          return <Banner {...elemOb['props']}>{elemOb['value']}</Banner>;

        case NANO.DIVIDER:
          return <Divider {...elemOb['props']} />;

        case NANO.VIEW:
          if (elemOb['onClick'] != null) {
            return (
              <TouchableOpacity
                key={'TouchableOpacity' + index}
                onPress={onPress}
                {...elemOb['props']}>
                {getViewItems(elemOb['content'], false)}
              </TouchableOpacity>
            );
          }

          return (
            <View key={'view' + index} {...elemOb['props']}>
              {getViewItems(elemOb['content'])}
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
      const item = getElementAsPerComponent(elemet, index, onPressAllowed);
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
