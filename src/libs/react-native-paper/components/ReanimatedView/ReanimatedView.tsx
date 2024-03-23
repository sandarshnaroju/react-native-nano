import Animated from 'react-native-reanimated';
import React, {useEffect} from 'react';
const ReanimatedView = ({
  elementProps,
  getViewItems,
  onElementLoaded,
  children,
  animatedStyles,
  animatedProps,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <Animated.View
      style={[elementProps?.props?.style, animatedStyles.current]}
      animatedProps={animatedProps}
      {...elementProps}>
      {getViewItems(elementProps['content'], true, onElementLoaded)}
    </Animated.View>
  );
};
export default ReanimatedView;
