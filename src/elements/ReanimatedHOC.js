import React from 'react';
import NANO from '../utils/Constants';
import ReanimatedImage from '../components/ReanimatedImage';
import ReanimatedText from '../components/ReanimatedText';
import {useReanimationHook} from '../hooks/UseReanimationHook';
import {TouchableOpacity} from 'react-native';
import ReanimatedView from '../components/ReanimatedView';

const ReanimatedHOC = ({
  elementProps,
  getViewItems,
  onElementLoaded,
  elemObjAfterThemesSet,
  index,
}) => {
  let [animatedStylesNewRef, animatedPropsRef] = useReanimationHook({
    elementProps,
  });
  if (elementProps != null && elementProps['component'] != null) {
    switch (elementProps['component']) {
      case NANO.REANIMATED_IMAGE:
        return (
          <ReanimatedImage
            elementProps={elementProps}
            animatedProps={animatedPropsRef}
            animatedStyles={animatedStylesNewRef}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
          />
        );
      case NANO.REANIMATED_TEXT:
        return (
          <ReanimatedText
            elementProps={elementProps}
            animatedProps={animatedPropsRef}
            animatedStyles={animatedStylesNewRef}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
          />
        );
      case NANO.REANIMATED_VIEW:
        if (elemObjAfterThemesSet['onPress'] != null) {
          return (
            <TouchableOpacity
              key={'TouchableOpacity' + index}
              {...elementProps['props']}
              {...elementProps}>
              <ReanimatedView
                key={'reanimated_view' + index}
                elementProps={elementProps}
                getViewItems={getViewItems}
                onElementLoaded={onElementLoaded}
                animatedProps={animatedPropsRef}
                animatedStyles={animatedStylesNewRef}
              />
            </TouchableOpacity>
          );
        }

        return (
          <ReanimatedView
            key={'reanimated_view' + index}
            elementProps={elementProps}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
            animatedProps={animatedPropsRef}
            animatedStyles={animatedStylesNewRef}
          />
        );

      default:
        return null;
    }
  }
};
export default ReanimatedHOC;
