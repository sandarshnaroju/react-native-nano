import React, {useEffect} from 'react';
import {Avatar} from 'react-native-paper';

function AvatarImage({
  heightWeightFormattedElemObj,
  elemOb,
  funProps,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <Avatar.Image
      {...heightWeightFormattedElemObj['props']}
      source={{uri: elemOb['value']}}
      {...funProps}
    />
  );
}

export default AvatarImage;
