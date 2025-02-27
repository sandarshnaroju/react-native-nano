import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView as NativeKeyboardAvoidingVIew ,

} from 'react-native';

interface ElementProps {
  [key: string]: any;
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
const KeyboardAvoidingView: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativeKeyboardAvoidingVIew {...elementProps['props']} {...elementProps}>
      {getViewItems(elementProps.content, true, onElementLoaded)}
    </NativeKeyboardAvoidingVIew>
  );
};

export default KeyboardAvoidingView;
