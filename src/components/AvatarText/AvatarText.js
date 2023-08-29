import React, {useEffect} from 'react';
import {Avatar} from 'react-native-paper';

function AvatarText({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <Avatar.Text
      {...elementProps['props']}
      label={elementProps['value']}
      {...elementProps}
    />
  );
}

export default AvatarText;
