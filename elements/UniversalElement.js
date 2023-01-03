import React from 'react';
import {View} from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Badge,
  Banner,
  Button,
  Card,
  Checkbox,
  Chip,
  Divider,
  FAB,
  ProgressBar,
  RadioButton,
  Switch,
  Text,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import NANO from '../Constants';
import {Nano} from '../Nano';

function UniversalElement({elemObj, onPress, navigation}) {
  const getElementAsPerComponent = (elemOb, index = null) => {
    if (elemOb != null && elemOb['component'] != null) {
      switch (elemOb['component']) {
        case NANO.BUTTON:
          return (
            <Button
              {...elemOb['props']}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}>
              {elemOb['value']}
            </Button>
          );
        case NANO.TEXT:
          return (
            <Text
              key={index}
              {...elemOb['props']}
              style={elemOb['props']['style']}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}>
              {' '}
              {elemOb['value']}{' '}
            </Text>
          );

        case NANO.ACTIVITYINDICATOR:
          console.log('text onjjee', elemOb['value']);

          return (
            <ActivityIndicator
              {...elemOb['props']}
              style={elemOb['props']['style']}
              animating={elemOb['value']}
            />
          );
        case NANO.ICON:
          return (
            <Avatar.Icon
              {...elemOb['props']}
              style={elemOb['props']['style']}
              icon={elemOb['value']}
            />
          );

        case NANO.IMAGE:
          return (
            <Avatar.Image
              {...elemOb['props']}
              source={{uri: elemOb['value']}}
            />
          );

        case NANO.TEXTAVATAR:
          return <Avatar.Text {...elemOb['props']} label={elemOb['value']} />;

        case NANO.BADGE:
          return <Badge {...elemOb['props']}>{elemOb['value']}</Badge>;

        case NANO.CHECKBOX:
          return (
            <Checkbox
              key={index}
              {...elemOb['props']}
              status={elemOb['value'] ? 'checked' : 'unchecked'}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}
            />
          );
        case NANO.CHIP:
          return (
            <Chip
              {...elemOb['props']}
              style={elemOb['props']['style']}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}>
              {elemOb['value']}
            </Chip>
          );
        case NANO.FAB:
          return (
            <FAB
              {...elemOb['props']}
              icon={elemOb['value']}
              style={elemOb['props']['style']}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}
            />
          );
        case NANO.PROGRESSBAR:
          return (
            <ProgressBar progress={elemOb['value']} {...elemOb['props']} />
          );

        case NANO.RADIOBUTTON:
          return (
            <RadioButton
              value="first"
              status={elemOb['value'] ? 'checked' : 'unchecked'}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}
            />
          );

        case NANO.SWITCH:
          return (
            <Switch
              {...elemOb['props']}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}
            />
          );
        case NANO.TEXTINPUT:
          return (
            <TextInput
              {...elemOb['props']}
              onPress={onPress}
              onLongPress={elemOb['onLongClick']}
            />
          );
        case NANO.BANNER:
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
        case NANO.CARD:
          return (
            <Card>
              <Card.Title title="Card Title" subtitle="Card Subtitle" />
              <Card.Content>
                <Nano screen={elemOb['content']} />
              </Card.Content>
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Ok</Button>
              </Card.Actions>
            </Card>
          );

        case NANO.DIVIDER:
          return <Divider {...elemOb['props']} />;

        case NANO.VIEW:
          return (
            <View {...elemOb['props']}>{getViewItems(elemOb['content'])}</View>
          );
        default:
          return;
      }
    }
    return <Text key={'keke'}> {' Error'} </Text>;
  };
  const getViewItems = content => {
    const elements = [];
    content.forEach((elemet, index) => {
      const item = getElementAsPerComponent(elemet, index);
      elements.push(item);
    });
    return elements;
  };
  const displayItem = getElementAsPerComponent(elemObj);
  // console.log('displayItem', displayItem);

  return displayItem;
}

export default UniversalElement;
