import React, {useEffect} from 'react';
import {Avatar} from 'react-native-paper';

function AvatarImage({
  elementProps,

  getViewItems,
  onElementLoaded,
}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <Avatar.Image
      {...elementProps['props']}
      source={{uri: elementProps['value']}}
      {...elementProps}
    />
  );
}

export default AvatarImage;
