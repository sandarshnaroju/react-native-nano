import React, {useEffect} from 'react';
import {Pressable as NativePressable} from 'react-native';
interface ElementProps {
  [key: string]: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const Pressable: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativePressable {...elementProps.props} {...elementProps}>
      {elementProps.value}
    </NativePressable>
  );
};

export default Pressable;
