import React, {useEffect} from 'react';
import {Text as NativeText} from 'react-native';
interface ElementProps {
    [key: string]: any;
  }

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
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
    <NativeText {...elementProps.props} {...elementProps}  >
      {elementProps.value}
    </NativeText>
  );
};


export default Text;
