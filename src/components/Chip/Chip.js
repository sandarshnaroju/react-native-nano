import React, {useEffect} from 'react';
import {Chip as PaperChip} from 'react-native-paper';

function Chip({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperChip
      {...elementProps['props']}
      style={
        elementProps != null && elementProps['props'] != null
          ? elementProps['props']['style']
          : null
      }
      {...elementProps}>
      {elementProps['value']}
    </PaperChip>
  );
}

export default Chip;
