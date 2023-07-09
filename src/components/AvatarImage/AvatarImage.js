import React from 'react';
import {Avatar} from 'react-native-paper';

function AvatarImage({heightWeightFormattedElemObj, elemOb, funProps}) {
  return (
    <Avatar.Image
      {...heightWeightFormattedElemObj['props']}
      source={{uri: elemOb['value']}}
      {...funProps}
    />
  );
}

export default AvatarImage;
