import Animated from 'react-native-reanimated';
import React, {useEffect} from 'react';
const ReanimatedImage = ({
  elementProps,
  getViewItems,
  onElementLoaded,
  animatedStyles,
  animatedProps,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);

  return (
    <Animated.Image
      style={[elementProps?.props?.style, animatedStyles.current]}
      animatedProps={animatedProps}
      {...elementProps['props']}
      {...elementProps}
      source={elementProps['value']}
    />
  );
};
export default ReanimatedImage;
