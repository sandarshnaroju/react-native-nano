import React, {useEffect} from 'react';
import {TextInput as PaperTextInput, TextInputProps} from 'react-native-paper';
interface ElementProps {
  props: TextInputProps;
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
const TextInput: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <PaperTextInput
      {...elementProps['props']}
      scrollEnabled={false}
      value={elementProps['value']}
      {...elementProps}
    />
  );
};

export default TextInput;
