import React from 'react';
import {Text, Button} from 'react-native-paper';

function UniversalElement({elemObj, onPress}) {
  const getElementAsPerComponent = elemOb => {
    switch (elemOb['component']) {
      case 'button':
        return (
          <Button
            {...elemOb['props']}
            onPress={onPress}
            onLongPress={elemOb['onLongClick']}>
            {elemOb['value']}
          </Button>
        );
      case 'text':
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

      default:
        return;
    }
  };
  return getElementAsPerComponent(elemObj);
}

export default UniversalElement;
