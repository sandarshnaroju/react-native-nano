import React, {useEffect} from 'react';
import {TextInput as NativeTextInput} from 'react-native';
interface ElementProps {
    [key: string]: any;
  }

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
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
    <NativeTextInput {...elementProps.props} {...elementProps}>
      {elementProps.value}
    </NativeTextInput>
  );
};

export default TextInput;
