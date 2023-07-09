import React from 'react';
import {RadioButton as PaperRadioButton} from 'react-native-paper';

function RadioButton({
  elemOb,
  isOnPressAllowed,
  onLongPress,
  onPress,
  funProps,
}) {
  return (
    <PaperRadioButton
      value="first"
      status={elemOb['value'] ? 'checked' : 'unchecked'}
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
}

export default RadioButton;
