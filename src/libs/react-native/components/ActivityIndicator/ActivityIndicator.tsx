import React, {useEffect} from 'react';
import {ActivityIndicator as NativeActivityIndicator} from 'react-native';

interface ElementProps {
  [key: string]: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems: Function;
  onElementLoaded: Function;
}

const ActivityIndicator: React.FC<Props> = ({
  elementProps,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <NativeActivityIndicator
      {...elementProps.props}
      style={elementProps.props?.style}
      animating={elementProps.value}
      {...elementProps}
    />
  );
};

export default ActivityIndicator;
