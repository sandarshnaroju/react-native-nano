import React, {useEffect} from 'react';
import {RefreshControl as NativeRefreshControl} from 'react-native';
interface ElementProps {
  [key: string]: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems?: () => void;
  onElementLoaded: (elementProps: ElementProps) => void;
}

const RefreshControl: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return <NativeRefreshControl {...elementProps.props} {...elementProps} />;
};

export default RefreshControl;
