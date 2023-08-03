import React, {useEffect} from 'react';
import {Chip as PaperChip} from 'react-native-paper';

function Chip({
  heightWeightFormattedElemObj,
  isOnPressAllowed,
  onPress,
  elemOb,
  funProps,
  onLongPress,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperChip
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
      {...funProps}>
      {elemOb['value']}
    </PaperChip>
  );
}

export default Chip;
