import React, {useEffect} from 'react';
import {Button as NativeButton} from 'react-native';
interface ElementProps {
  [key: string]: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const Button: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativeButton
      {...elementProps.props}
      {...elementProps}
      title={elementProps.value}
    />
  );
};

export default Button;
