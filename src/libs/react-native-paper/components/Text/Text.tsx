import React, {useEffect} from 'react';
import {Text as PaperText, TextProps} from 'react-native-paper';
interface ElementProps {
  props: TextProps;
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
const Text: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperText
      {...elementProps['props']}
      style={
        elementProps != null && elementProps['props'] != null
          ? elementProps['props']['style']
          : null
      }
      {...elementProps}>
      {' '}
      {elementProps['value']}{' '}
    </PaperText>
  );
};

export default Text;
