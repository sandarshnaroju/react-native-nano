import React, {useEffect} from 'react';
import {Modal as PaperModal, Portal} from 'react-native-paper';
function Modal({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Portal>
      <PaperModal
        {...elementProps['props']}
        {...elementProps}
        visible={elementProps['value']}>
        {getViewItems(elementProps['content'], true, onElementLoaded)}
      </PaperModal>
    </Portal>
  );
}

export default Modal;
