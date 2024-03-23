import React, {useEffect} from 'react';
import {
  IconButtonProps,
  IconButton as PaperIconButton,
} from 'react-native-paper';
interface ElementProps {
  props: IconButtonProps;
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
const IconButton: React.FC<Props> = ({
  elementProps,

  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperIconButton
      {...elementProps['props']}
      icon={elementProps['value']}
      {...elementProps}
    />
  );
};

export default IconButton;
