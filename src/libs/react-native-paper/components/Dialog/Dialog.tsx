import React, {useEffect} from 'react';
import {Dialog as PaperDialog, Portal, DialogProps} from 'react-native-paper';

interface ElementProps {
  props: DialogProps;
  value: boolean;
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

const NanoDialog: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Portal>
      <PaperDialog
        visible={elementProps.value}
        {...elementProps}
        {...elementProps.props}>
        {getViewItems(elementProps.content, true, onElementLoaded)}
      </PaperDialog>
    </Portal>
  );
};

export default NanoDialog;
