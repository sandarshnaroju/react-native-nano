import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import React from 'react';
import TopTabScreen from './TopTabScreen';
const Tab = createMaterialTopTabNavigator();

const getScreens = content => {
  const drawerScreens = [];

  if (content != null && content.length > 0) {
    content.forEach(screen => {
      drawerScreens.push(
        <Tab.Screen key={screen.name} name={screen.name} kerala={true}>
          {props => <TopTabScreen {...props} screen={screen} />}
        </Tab.Screen>,
      );
    });
  }
  return drawerScreens;
  //   return null;
};
function NanoTopTabs({drawerObj}) {
  // console.log('toptabs', drawerObj.content);

  // return null;
  return <Tab.Navigator>{getScreens(drawerObj['content'])}</Tab.Navigator>;
}

export default NanoTopTabs;
