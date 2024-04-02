import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TopTabScreen, {Screen} from '../toptabs/TopTabScreen';
import {modifyElemObjAsPerTheme} from '../../utils/Utilities';

const Tab = createMaterialBottomTabNavigator();

interface GetScreensProps {
  content: Screen[];
  navigation: any; // Adjust type as per your navigation object type
  themes: any;
  moduleParameters: any;
  packages;
}
const GetScreens = ({
  content,
  navigation,
  themes,
  moduleParameters,
  packages,
}: GetScreensProps) => {
  const drawerScreens = [];

  if (content != null && content.length > 0) {
    content.forEach((screen, index) => {
      const screenProps =
        screen != null &&
        screen.props != null &&
        screen.props.screenProps != null
          ? screen.props.screenProps
          : {};
      drawerScreens.push(
        <Tab.Screen {...screenProps} key={screen.name} name={screen.name}>
          {props => (
            <TopTabScreen
              {...props}
              screen={screen}
              navigation={navigation}
              moduleParameters={moduleParameters}
              themes={themes}
              packages={packages}
            />
          )}
        </Tab.Screen>,
      );
    });
  }
  return drawerScreens;
};
interface NanoBottomTabsProps {
  drawerObj: any;
  navigation: any;
  themes: any[];
  moduleParameters: any;
  context: any;
  packages;
}

const NanoBottomTabs = ({
  drawerObj,
  navigation,
  themes,
  moduleParameters,
  context,
  packages,
}: NanoBottomTabsProps) => {
  let navigatorPropsWithThemesSet = drawerObj.navigatorProps;
  if (themes != null && themes.length > 0) {
    navigatorPropsWithThemesSet = modifyElemObjAsPerTheme(
      drawerObj.navigatorProps,
      themes,
      context,
    );
  }

  return (
    <Tab.Navigator {...navigatorPropsWithThemesSet}>
      {GetScreens({
        content: drawerObj['content'],
        navigation: navigation,
        moduleParameters: moduleParameters,
        themes: themes,
        packages,
      })}
    </Tab.Navigator>
  );
};

export default NanoBottomTabs;
