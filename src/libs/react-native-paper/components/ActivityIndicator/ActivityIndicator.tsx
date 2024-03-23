import React, {useEffect} from 'react';
import {ActivityIndicator as PaperActivityIndicator} from 'react-native-paper';

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
    <PaperActivityIndicator
      {...elementProps.props}
      style={elementProps.props?.style}
      animating={elementProps.value}
      {...elementProps}
    />
  );
};

export default ActivityIndicator;
