import React, {useEffect} from 'react';
import {StatusBar as NativeStatusBar} from 'react-native';
interface ElementProps {
  [key: string]: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const StatusBar: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <NativeStatusBar {...elementProps.props} {...elementProps} />;
};

export default StatusBar;
