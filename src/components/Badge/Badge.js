import React, {useEffect} from 'react';
import {Badge as PaperBadge} from 'react-native-paper';

function Badge({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperBadge {...elementProps['props']} {...elementProps}>
      {elementProps['value']}
    </PaperBadge>
  );
}

export default Badge;
