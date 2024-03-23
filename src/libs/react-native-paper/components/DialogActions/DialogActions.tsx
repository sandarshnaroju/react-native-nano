import React, {useEffect} from 'react';
import {Dialog, DialogActionsProps} from 'react-native-paper';

interface ElementProps {
  props: DialogActionsProps;
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

const NanoDialogAction: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Dialog.Actions {...elementProps} {...elementProps.props}>
      {getViewItems(elementProps.content, true, onElementLoaded)}
    </Dialog.Actions>
  );
};

export default NanoDialogAction;
