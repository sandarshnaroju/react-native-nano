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
  return <Avatar.Icon {...elementProps['props']} {...elementProps} />;
}

export default AvatarImage;
