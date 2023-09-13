import React, {useEffect} from 'react';
import {Dialog} from 'react-native-paper';

function NanoDialogTitle({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Dialog.Title {...elementProps['props']} {...elementProps}>
      {elementProps['value']}
    </Dialog.Title>
  );
}

export default NanoDialogTitle;
