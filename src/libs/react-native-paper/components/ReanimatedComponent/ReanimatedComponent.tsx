import Animated from 'react-native-reanimated';
import React from 'react';
import {View} from 'react-native';
import {useReanimationHook} from '../../../../core/hooks/UseReanimationHook';

const IntermidiateComponent = ({component}) => {
  const temp = React.forwardRef((props, ref) => {
    const renderChildren = () => {
      return React.Children.map(component, child => {
        return React.cloneElement(child, {
          style: props.style,
        });
      });
    };
    const finalComps = renderChildren();
    return <View>{finalComps}</View>;
  });
  return temp;
};
const ReanimatedComponent = ({elementProps, component}) => {
  let [animatedStyles, animatedProps] = useReanimationHook({
    elementProps,
  });

  const MyAnimatedComponent = Animated.createAnimatedComponent(
    IntermidiateComponent({component}),
  );

  return (
    <MyAnimatedComponent
      style={[elementProps?.props?.style, animatedStyles.current]}
      animatedProps={animatedProps}
    />
  );
};
export default ReanimatedComponent;
