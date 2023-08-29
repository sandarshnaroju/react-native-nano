import React, {useEffect} from 'react';
import {Text as PaperText} from 'react-native-paper';

function Text({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperText
      {...elementProps['props']}
      style={
        elementProps != null && elementProps['props'] != null
          ? elementProps['props']['style']
          : null
      }
      {...elementProps}>
      {' '}
      {elementProps['value']}{' '}
    </PaperText>
  );
}

export default Text;
