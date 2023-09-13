import React, {useEffect} from 'react';
import {Dialog} from 'react-native-paper';

function NanoDialogAction({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Dialog.Actions {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </Dialog.Actions>
  );
}

export default NanoDialogAction;
