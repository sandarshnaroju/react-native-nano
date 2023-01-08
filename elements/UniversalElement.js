import React from 'react';
import {TouchableOpacity, View} from 'react-native';
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
} from 'react-native-paper';
import NANO from '../Constants';
import {Nano} from '../Nano';

function UniversalElement({elemObj, onPress, navigation}) {
  const getElementAsPerComponent = (elemOb, index = null, isOnPressAllowed) => {
    if (elemOb != null && elemOb['component'] != null) {
      switch (elemOb['component']) {
        case NANO.BUTTON:
          return (
            <Button
              {...elemOb['props']}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={elemOb['onLongClick']}>
              {elemOb['value']}
            </Button>
          );

        case NANO.TEXT:
          return (
            <Text
              key={'text' + index + Math.random()}
              {...elemOb['props']}
              style={elemOb['props']['style']}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={elemOb['onLongClick']}>
              {' '}
              {elemOb['value']}{' '}
            </Text>
          );

        case NANO.ACTIVITY_INDICATOR:
          return (
            <ActivityIndicator
              {...elemOb['props']}
              style={elemOb['props']['style']}
              animating={elemOb['value']}
            />
          );
        case NANO.AVATAR_ICON:
          return (
            <Avatar.Icon
              {...elemOb['props']}
              style={elemOb['props']['style']}
              icon={elemOb['value']}
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
              key={'checkbox' + index + Math.random()}
              {...elemOb['props']}
              status={elemOb['value'] ? 'checked' : 'unchecked'}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={elemOb['onLongClick']}
            />
          );
        case NANO.CHIP:
          return (
            <Chip
              {...elemOb['props']}
              style={elemOb['props']['style']}
              onPress={isOnPressAllowed ? onPress : null}
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
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={elemOb['onLongClick']}
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
              onLongPress={elemOb['onLongClick']}
            />
          );

        case NANO.SWITCH:
          return (
            <Switch
              {...elemOb['props']}
              onPress={isOnPressAllowed ? onPress : null}
              onLongPress={elemOb['onLongClick']}
            />
          );
        case NANO.TEXT_INPUT:
          return (
            <TextInput
              {...elemOb['props']}
              onPress={isOnPressAllowed ? onPress : null}
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
          if (elemOb['onClick'] != null) {
            return (
              <TouchableOpacity
                // onPress={() => {
                //   console.log('pressss');
                // }}
                key={'TouchableOpacity' + index + Math.random()}
                onPress={onPress}
                {...elemOb['props']}>
                {getViewItems(elemOb['content'], false)}
              </TouchableOpacity>
            );
          }

          return (
            <View key={'view' + index + Math.random()} {...elemOb['props']}>
              {getViewItems(elemOb['content'])}
            </View>
          );
        default:
          return;
      }
    }
    return <Text key={'error' + index + Math.random()}> {' Error'} </Text>;
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

  return displayItem;
}

export default UniversalElement;
