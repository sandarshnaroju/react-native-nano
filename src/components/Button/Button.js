import React from 'react';
import {Button as PaperButton} from 'react-native-paper';

function Button({
  isOnPressAllowed,
  onLongPress,
  funProps,
  elemOb,
  heightWeightFormattedElemObj,
}) {
  return (
    <PaperButton
      onLongPress={isOnPressAllowed ? onLongPress : null}
      {...heightWeightFormattedElemObj['props']}
      {...funProps}>
      {elemOb['value']}
    </PaperButton>
  );
}

export default Button;
