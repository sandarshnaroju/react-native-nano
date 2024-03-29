import React from 'react';
import NANO from '../../Constants';

import {useReanimationHook} from '../hooks/UseReanimationHook';
import {TouchableOpacity} from 'react-native';

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
  requiredPackageObj: {};
}

const ReanimatedHOC: React.FC<Props> = ({
  elementProps,
  getViewItems,
  onElementLoaded,
  elemObjAfterThemesSet,
  index,

  requiredPackageObj,
}) => {
  let [animatedStylesNewRef, animatedPropsRef] = useReanimationHook({
    elementProps,
  });
  const requiredComponentObj = requiredPackageObj.package.components.find(
    t => t.name == 'reanimated_' + elemObjAfterThemesSet['component'],
  );
  const Component = requiredComponentObj.component;

  if (elementProps != null && elementProps['component'] != null) {
    switch (elementProps['component']) {
      case NANO.VIEW:
        if (elemObjAfterThemesSet['onPress'] != null) {
          return (
            <TouchableOpacity
              key={'TouchableOpacity' + index}
              {...elementProps['props']}
              {...elementProps}>
              <Component
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
          <Component
            key={'reanimated_view' + index}
            elementProps={elementProps}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
            animatedProps={animatedPropsRef}
            animatedStyles={animatedStylesNewRef}
          />
        );

      default:
        return (
          <Component
            elementProps={elementProps}
            animatedProps={animatedPropsRef}
            animatedStyles={animatedStylesNewRef}
            getViewItems={getViewItems}
            onElementLoaded={onElementLoaded}
          />
        );
    }
  }
};
export default ReanimatedHOC;
