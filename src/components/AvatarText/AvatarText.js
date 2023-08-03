import React, {useEffect} from 'react';
import {Avatar} from 'react-native-paper';

function AvatarText({
  heightWeightFormattedElemObj,
  elemOb,
  funProps,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elemOb);
  }, []);
  return (
    <Avatar.Text
      {...heightWeightFormattedElemObj['props']}
      label={elemOb['value']}
      {...funProps}
    />
  );
}

export default AvatarText;
