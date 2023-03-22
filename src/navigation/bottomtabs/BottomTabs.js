import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TopTabScreen from '../toptabs/TopTabScreen';

const Tab = createMaterialBottomTabNavigator();

const GetScreens = ({content, navigation}) => {
  const drawerScreens = [];

  if (content != null && content.length > 0) {
    content.forEach((screen, index) => {
      drawerScreens.push(
        <Tab.Screen
          {...screen.screenProps}
          key={screen.name}
          name={screen.name}>
          {props => (
            <TopTabScreen {...props} screen={screen} navigation={navigation} />
          )}
        </Tab.Screen>,
      );
    });
  }
  return drawerScreens;
};

function NanoBottomTabs({drawerObj, navigation}) {
  return (
    <Tab.Navigator {...drawerObj.navigatorProps}>
      {GetScreens({content: drawerObj['content'], navigation: navigation})}
    </Tab.Navigator>
  );
}

export default NanoBottomTabs;
