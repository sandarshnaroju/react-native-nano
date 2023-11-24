import React, {useEffect} from 'react';
import {Modal as PaperModal, Portal} from 'react-native-paper';
function Modal({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Portal.Host>
      <PaperModal
        {...elementProps['props']}
        {...elementProps}
        visible={elementProps['value']}>
        {getViewItems(elementProps['content'], true, onElementLoaded)}
      </PaperModal>
    </Portal.Host>
  );
}

export default Modal;
