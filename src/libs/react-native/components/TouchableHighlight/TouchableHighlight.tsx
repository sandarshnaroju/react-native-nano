import React, {useEffect} from 'react';
import {
  TouchableHighlightProps,
  TouchableHighlight as NativeTouchableHighlight,
} from 'react-native';
interface ElementProps {
  props: TouchableHighlightProps;
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
const TouchableHighlight: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativeTouchableHighlight {...elementProps['props']} {...elementProps}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </NativeTouchableHighlight>
  );
};

export default TouchableHighlight;
