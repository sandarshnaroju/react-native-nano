import React, {useEffect} from 'react';
import {ModalProps, Modal as PaperModal, Portal} from 'react-native-paper';
interface ElementProps {
  props: ModalProps;
  content: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems: (
    content: any,
    flag: boolean,
    onElementLoaded: (elementProps: ElementProps) => void,
  ) => React.ReactNode;
  onElementLoaded: (elementProps: ElementProps) => void;
}
const Modal: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Portal>
      <PaperModal
        visible={elementProps['value']}
        {...elementProps['props']}
        {...elementProps}>
        {getViewItems(elementProps['content'], true, onElementLoaded)}
      </PaperModal>
    </Portal>
  );
};

export default Modal;
