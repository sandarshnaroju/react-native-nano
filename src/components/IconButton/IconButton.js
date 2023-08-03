import React, {useEffect} from 'react';
import {IconButton as PaperIconButton} from 'react-native-paper';

function IconButton({
  elemOb,
  isOnPressAllowed,
  onPress,
  funProps,
  heightWeightFormattedElemObj,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <PaperIconButton
      {...heightWeightFormattedElemObj['props']}
      icon={elemOb['value']}
      onPress={
        isOnPressAllowed
          ? () => {
              onPress({itemJson: elemOb});
            }
          : null
      }
      {...funProps}
    />
  );
}

export default IconButton;
