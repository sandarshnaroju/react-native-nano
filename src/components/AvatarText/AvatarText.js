import React from 'react';
import {Avatar} from 'react-native-paper';

function AvatarText({heightWeightFormattedElemObj, elemOb, funProps}) {
  return (
    <Avatar.Text
      {...heightWeightFormattedElemObj['props']}
      label={elemOb['value']}
      {...funProps}
    />
  );
}

export default AvatarText;
