import Animated from 'react-native-reanimated';
import {useReanimationHook} from '../../customHooks/UseReanimationHook';
import React from 'react';
const ReanimatedText = ({elementProps}) => {
  let [animatedStylesNewRef, animatedPropsRef] = useReanimationHook({
    elementProps,
  });

  return (
    <Animated.Text
      style={[animatedStylesNewRef.current]}
      animatedProps={animatedPropsRef}
      {...elementProps}>
      {elementProps['value']}
    </Animated.Text>
  );
};
export default ReanimatedText;

const AnimatedTextComponent = ({
  elementProps,
  animatedProps,
  animatedStylesNewRef,
}) => {
  return (
    <Animated.Text
      style={[
        {fontWeight: 'bold', backgroundColor: 'pink'},
        animatedStylesNewRef.current,
      ]}
      animatedProps={animatedProps}
      // {...elementProps['props']}
      {...elementProps}>
      {' '}
      {elementProps['value']}
    </Animated.Text>
  );
};
