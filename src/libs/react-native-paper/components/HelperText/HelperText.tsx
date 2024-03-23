import React, {useEffect} from 'react';
import {
  HelperTextProps,
  HelperText as NanoHelperText,
} from 'react-native-paper';
interface ElementProps {
  props: HelperTextProps;
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
const HelperText: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NanoHelperText {...elementProps} {...elementProps['props']}>
      {elementProps['value']}
    </NanoHelperText>
  );
};

export default HelperText;
