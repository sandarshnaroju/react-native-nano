import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

function Button({isOnPressAllowed, onLongPress, funProps, elemOb}) {
  return (
    <PaperButton
      onLongPress={isOnPressAllowed ? onLongPress : null}
      {...funProps}>
      {elemOb['value']}
    </PaperButton>
  );
}

export default Button;