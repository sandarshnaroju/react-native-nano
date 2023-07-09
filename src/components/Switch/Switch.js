import React from 'react';
import {Switch as PaperSwitch} from 'react-native-paper';

function Switch({
  heightWeightFormattedElemObj,
  isOnPressAllowed,
  onPress,
  onLongPress,
  funProps,
  elemOb,
}) {
  return (
    <PaperSwitch
      {...heightWeightFormattedElemObj['props']}
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

export default Switch;
