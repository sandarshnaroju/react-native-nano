import React, {useEffect} from 'react';
import {Animated, ViewProps} from 'react-native';
interface AnimatedViewProps {
  elementProps: {
    props: ViewProps;
    content: [];
  };
  getViewItems: (
    content: [],
    animated: boolean,
    onElementLoaded: (props: ViewProps) => void,
  ) => React.ReactNode;
  onElementLoaded: (props: ViewProps) => void;
}

const AnimatedView: React.FC<AnimatedViewProps> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps.props);
  }, []);

  return (
    <Animated.View {...elementProps.props}>
      {getViewItems(elementProps.content, true, onElementLoaded)}
    </Animated.View>
  );
};

export default AnimatedView;
