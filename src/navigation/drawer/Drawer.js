import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {TopTabNano} from '../../nano/TopTabNano';
import TopTabScreen from '../toptabs/TopTabScreen';

const Drawer = createDrawerNavigator();

const getScreens = content => {
  const drawerScreens = [];

  if (content != null && content.length > 0) {
    content.forEach(screen => {
      drawerScreens.push(
        <Drawer.Screen
          {...screen.screenProps}
          key={screen.name}
          name={screen.name}>
          {props => <TopTabScreen {...props} screen={screen} />}
        </Drawer.Screen>,
      );
    });
  }
  return drawerScreens;
};
function DrawerNavigation({drawerObj}) {
  return (
    <Drawer.Navigator
      {...drawerObj['drawerNavigatorProps']}
      initialRouteName={drawerObj['content'][0]['name']}>
      {getScreens(drawerObj['content'])}
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
