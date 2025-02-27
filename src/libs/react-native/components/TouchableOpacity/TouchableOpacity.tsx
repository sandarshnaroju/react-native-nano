import React, {useEffect} from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity as NativeTouchableOpacity,
} from 'react-native';
interface ElementProps {
  props: TouchableOpacityProps;
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
const TouchableOpacity: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativeTouchableOpacity {...elementProps['props']} {...elementProps}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </NativeTouchableOpacity>
  );
};

export default TouchableOpacity;
