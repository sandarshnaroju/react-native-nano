import React from 'react';
import NANO from '../../Constants';
import ReanimatedImage from '../../libs/react-native-paper/components/ReanimatedImage';
import ReanimatedText from '../../libs/react-native-paper/components/ReanimatedText';
import {useReanimationHook} from '../hooks/UseReanimationHook';
import {TouchableOpacity} from 'react-native';
import ReanimatedView from '../../libs/react-native-paper/components/ReanimatedView';

interface ElementProps {
  component: string;
  [key: string]: any;
}

interface Props {
  elementProps: ElementProps;
  getViewItems: () => void;
  onElementLoaded: () => void;
  elemObjAfterThemesSet: {[key: string]: any};
  index: number;
}

const ReanimatedHOC: React.FC<Props> = ({
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
      case NANO.IMAGE:
        return (
          <ReanimatedImage
            elementProps={elementProps}
            animatedProps={animatedPropsRef}
            animatedStyles={animatedStylesNewRef}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
          />
        );
      case NANO.TEXT:
        return (
          <ReanimatedText
            elementProps={elementProps}
            animatedProps={animatedPropsRef}
            animatedStyles={animatedStylesNewRef}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
          />
        );
      case NANO.VIEW:
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
