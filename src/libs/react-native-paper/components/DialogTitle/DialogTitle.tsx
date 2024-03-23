import React, {useEffect} from 'react';
import {Dialog, DialogTitleProps} from 'react-native-paper';
interface ElementProps {
  props: DialogTitleProps;
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
const NanoDialogTitle: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Dialog.Title {...elementProps['props']} {...elementProps}>
      {elementProps['value']}
    </Dialog.Title>
  );
};

export default NanoDialogTitle;
