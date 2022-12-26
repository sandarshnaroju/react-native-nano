import React from 'react';
import {
  Text,
  Button,
  ActivityIndicator,
  Avatar,
  Badge,
  Checkbox,
  Chip,
  FAB,
  ProgressBar,
  RadioButton,
  Switch,
  TextInput,
  Banner,
} from 'react-native-paper';
import NanoComponents from './Constants';

function UniversalElement({elemObj, onPress}) {
  const getElementAsPerComponent = elemOb => {
    switch (elemOb['component']) {
      case NanoComponents.BUTTON:
        return (
          <Button
            {...elemOb['props']}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}>
            {elemOb['value']}
          </Button>
        );
      case NanoComponents.TEXT:
        return (
          <Text
            {...elemOb['props']}
            style={elemOb['props']['style']}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}>
            {' '}
            {elemOb['value']}{' '}
          </Text>
        );

      case NanoComponents.ACTIVITYINDICATOR:
        return (
          <ActivityIndicator
            {...elemOb['props']}
            style={elemOb['props']['style']}
            animating={elemOb['value']}
          />
        );
      case NanoComponents.ICON:
        return (
          <Avatar.Icon
            {...elemOb['props']}
            style={elemOb['props']['style']}
            icon={elemOb['value']}
          />
        );

      case NanoComponents.IMAGE:
        return (
          <Avatar.Image {...elemOb['props']} source={{uri: elemOb['value']}} />
        );

      case NanoComponents.TEXTAVATAR:
        return <Avatar.Text {...elemOb['props']} label={elemOb['value']} />;

      case NanoComponents.BADGE:
        return <Badge {...elemOb['props']}>{elemOb['value']}</Badge>;

      case NanoComponents.CHECKBOX:
        return (
          <Checkbox
            {...elemOb['props']}
            status={elemOb['value'] ? 'checked' : 'unchecked'}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}
          />
        );
      case NanoComponents.CHIP:
        return (
          <Chip
            {...elemOb['props']}
            style={elemOb['props']['style']}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}>
            {elemOb['value']}
          </Chip>
        );
      case NanoComponents.FAB:
        return (
          <FAB
            {...elemOb['props']}
            icon={elemOb['value']}
            style={elemOb['props']['style']}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}
          />
        );
      case NanoComponents.PROGRESSBAR:
        return <ProgressBar progress={elemOb['value']} {...elemOb['props']} />;

      case NanoComponents.RADIOBUTTON:
        return (
          <RadioButton
            value="first"
            status={elemOb['value'] ? 'checked' : 'unchecked'}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}
          />
        );

      case NanoComponents.SWITCH:
        return (
          <Switch
            {...elemOb['props']}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}
          />
        );
      case NanoComponents.TEXTINPUT:
        return (
          <TextInput
            {...elemOb['props']}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}
          />
        );
      case NanoComponents.BANNER:
        return (
          <Banner
            {...elemOb['props']}
            actions={[
              {
                label: 'Fix it',
                onPress: () => {},
              },
              {
                label: 'Learn more',
                onPress: () => {},
              },
            ]}>
            {elemOb['value']}
          </Banner>
        );
      default:
        return;
    }
  };
  return getElementAsPerComponent(elemObj);
}

export default UniversalElement;
