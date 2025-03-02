import React, {useEffect} from 'react';
import {Pressable as NativePressable} from 'react-native';
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
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </NativePressable>
  );
};

export default Pressable;
