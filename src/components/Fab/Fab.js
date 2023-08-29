import React, {useEffect} from 'react';
import {FAB as PaperFAB} from 'react-native-paper';

function Fab({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperFAB
      {...elementProps['props']}
      style={
        elementProps != null && elementProps['props'] != null
          ? elementProps['props']['style']
          : null
      }
      {...elementProps}
    />
  );
}

export default Fab;
