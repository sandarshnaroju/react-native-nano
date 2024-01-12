import React, {useEffect} from 'react';
import {Animated} from 'react-native';

function AnimatedView({elementProps, getViewItems, onElementLoaded}) {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Animated.View {...elementProps} {...elementProps['props']}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </Animated.View>
  );
}

export default AnimatedView;
