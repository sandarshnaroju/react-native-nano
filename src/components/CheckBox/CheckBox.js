import React from 'react';
import {Checkbox as PaperCheckBox} from 'react-native-paper';

function CheckBox({
  heightWeightFormattedElemObj,
  elemOb,
  isOnPressAllowed,
  onPress,
  onLongPress,
  funProps,
}) {
  return (
    <PaperCheckBox
      {...heightWeightFormattedElemObj['props']}
      status={
        elemOb['value'] != null
          ? elemOb['value']
            ? 'checked'
            : 'unchecked'
          : 'indeterminate'
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

export default CheckBox;
