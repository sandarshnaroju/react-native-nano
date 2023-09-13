import React, {useEffect} from 'react';
import {Dialog as PaperDialog, Portal} from 'react-native-paper';

function NanoDialog({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <Portal>
      <PaperDialog
        visible={elementProps['value']}
        {...elementProps}
        {...elementProps['props']}>
        {getViewItems(elementProps['content'], true, onElementLoaded)}
      </PaperDialog>
    </Portal>
  );
}

export default NanoDialog;
