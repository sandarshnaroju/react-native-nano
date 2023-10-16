import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import TopTabScreen from '../toptabs/TopTabScreen';
import { GetContextProvider } from '../../context/DataContext';
import { modifyElemObjAsPerTheme } from '../../utils/Utilities';

const Tab = createMaterialBottomTabNavigator();

const GetScreens = ({
  content,
  navigation,
  customComponents,
  unModifiedScreen,
  themes,
  moduleParameters,
}) => {
  const drawerScreens = [];


  if (content != null && content.length > 0) {
    content.forEach((screen, index) => {
      drawerScreens.push(
        <Tab.Screen
          {...screen.screenProps}
          key={screen.name}
          name={screen.name}>
          {props => (
            <TopTabScreen
              {...props}
              screen={screen}
              navigation={navigation}
              customComponents={customComponents}
              moduleParameters={moduleParameters}
              themes={themes}
              unModifiedScreen={unModifiedScreen}
            />
          )}
        </Tab.Screen>,
      );
    });
  }
  return drawerScreens;
};

function NanoBottomTabs({
  drawerObj,
  navigation,
  customComponents,
  unModifiedScreen,
  themes,
  moduleParameters,
}) {
  const context = GetContextProvider();

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
        customComponents: customComponents,
        moduleParameters: moduleParameters,
        themes: themes,
        unModifiedScreen: unModifiedScreen,
      })}
    </Tab.Navigator>
  );
}

export default NanoBottomTabs;
