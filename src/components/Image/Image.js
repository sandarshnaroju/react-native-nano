import React from 'react';
import {Button} from 'react-native-paper';
import {TouchableOpacity, Image as PaperImage} from 'react-native';

function Image({
  elemOb,
  isOnPressAllowed,
  onPress,
  funProps,
  heightWeightFormattedElemObj,
  index,
}) {
  const imgSource =
    elemOb != null && elemOb['value'] != null
      ? elemOb['value'].indexOf('http') == 0
        ? {uri: elemOb['value']}
        : elemOb['value']
      : null;
  if (imgSource) {
    return (
      <TouchableOpacity
        key={'image' + index}
        onPress={
          isOnPressAllowed
            ? () => {
                onPress({itemJson: elemOb});
              }
            : null
        }
        {...funProps}>
        <PaperImage
          {...heightWeightFormattedElemObj['props']}
          {...funProps}
          source={imgSource}
        />
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

export default Image;
