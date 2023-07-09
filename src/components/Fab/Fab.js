import React from 'react';
import {FAB as PaperFAB} from 'react-native-paper';

function Fab({
  heightWeightFormattedElemObj,
  isOnPressAllowed,
  onPress,
  onLongPress,
  elemOb,
  funProps,
}) {
  return (
    <PaperFAB
      {...heightWeightFormattedElemObj['props']}
      style={
        heightWeightFormattedElemObj != null &&
        heightWeightFormattedElemObj['props'] != null
          ? heightWeightFormattedElemObj['props']['style']
          : null
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
}

export default Fab;
