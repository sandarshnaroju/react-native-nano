import React from 'react';

import isEqual from 'lodash/isEqual';

import {TopTabNano} from '../../nano/TopTabNano';
import {ScrollViewProps} from 'react-native';
interface Screen {
  screen: any; // Adjust type as per your screen type
  logic: any;
  name: string;
  onStart?: () => void;
  onEnd?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  props?: {
    scroll?: boolean;
    scrollViewProps?: ScrollViewProps;
    style?: any; // Adjust type as per your style type
  };
}

interface TopTabScreenProps {
  screen: Screen;
  navigation: any; // Adjust type as per your navigation object type
  route: any; // Adjust type as per your route object type
  customComponents: any;
  unModifiedScreen: any;
  themes: any;
  moduleParameters: any;
  context: any;
}
const TopTabScreen: React.FC<TopTabScreenProps> = ({
  screen,
  navigation,

  route,
  customComponents,
  unModifiedScreen,
  themes,
  moduleParameters,
  context,
}) => {
  return (
    <TopTabNano
      scroll={
        screen != null && screen.props != null && screen.props.scroll != null
          ? screen.props.scroll
          : false
      }
      scrollViewProps={
        screen != null &&
        screen.props != null &&
        screen.props.scrollViewProps != null
          ? screen.props.scrollViewProps
          : {}
      }
      style={
        screen != null && screen.props != null && screen.props.style
          ? screen.props.style
          : {}
      }
      screen={screen.screen}
      navigation={navigation}
      logicObject={screen.logic}
      screenName={screen.name}
      onStart={screen.onStart}
      onEnd={screen.onEnd}
      route={route}
      customComponents={customComponents}
      moduleParameters={moduleParameters}
      themes={themes}
      unModifiedScreen={unModifiedScreen}
      onPause={screen != null ? screen.onPause : null}
      context={context}
      onResume={screen != null ? screen.onResume : null}
    />
  );
};

function areEqual(prevProps, nextProps) {
  /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
  if (isEqual(nextProps, prevProps)) {
    return true;
  } else {
    return false;
  }
}
export default React.memo(TopTabScreen, areEqual);
