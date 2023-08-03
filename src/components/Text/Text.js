import React, {useEffect} from 'react';
import {Text as PaperText} from 'react-native-paper';

function Text({
  index,
  heightWeightFormattedElemObj,
  isOnPressAllowed,
  onLongPress,
  funProps,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(heightWeightFormattedElemObj);
  }, []);
  return (
    <PaperText
      {...heightWeightFormattedElemObj['props']}
      style={
        heightWeightFormattedElemObj != null &&
        heightWeightFormattedElemObj['props'] != null
          ? heightWeightFormattedElemObj['props']['style']
          : null
      }
      onLongPress={isOnPressAllowed ? onLongPress : null}
      {...funProps}>
      {' '}
      {heightWeightFormattedElemObj['value']}{' '}
    </PaperText>
  );
}

export default Text;
