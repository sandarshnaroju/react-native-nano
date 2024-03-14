import Animated from 'react-native-reanimated';
import React, {useEffect} from 'react';
const ReanimatedText = ({
  elementProps,
  animatedStyles,
  animatedProps,
  getViewItems,
  onElementLoaded,
}) => {
  useEffect(() => {
    onElementLoaded(elementProps);
  }, []);
  return (
    <Animated.Text
      style={[elementProps?.props?.style, animatedStyles.current]}
      animatedProps={animatedProps}
      {...elementProps}>
      {elementProps['value']}
    </Animated.Text>
  );
};
export default ReanimatedText;
