import React, {useEffect} from 'react';
import {
  TouchableWithoutFeedbackProps,
  TouchableWithoutFeedback as NativeTouchableWithoutFeedback,
} from 'react-native';
interface ElementProps {
  props: TouchableWithoutFeedbackProps;
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
const TouchableWithoutFeedback: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativeTouchableWithoutFeedback {...elementProps['props']} {...elementProps}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </NativeTouchableWithoutFeedback>
  );
};

export default TouchableWithoutFeedback;
