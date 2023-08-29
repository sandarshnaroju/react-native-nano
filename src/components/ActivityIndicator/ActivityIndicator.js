import React, {useEffect} from 'react';
import {ActivityIndicator as PaperActivityIndicator} from 'react-native-paper';

function ActivityIndicator({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperActivityIndicator
      {...elementProps['props']}
      style={
        elementProps != null && elementProps['props'] != null
          ? elementProps['props']['style']
          : null
      }
      animating={elementProps['value']}
      {...elementProps}
    />
  );
}

export default ActivityIndicator;
