import React, {useEffect} from 'react';
import {Dialog} from 'react-native-paper';

function NanoDialogContent({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Dialog.Content {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </Dialog.Content>
  );
}

export default NanoDialogContent;
