import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Nano} from './Nano';

const Drawer = createDrawerNavigator();
const DrawerScreen = ({navigation, screen}) => {
  return (
    <Nano
      scroll={false}
      screen={screen.screen}
      navigation={navigation}
      logicObject={screen.logic}
    />
  );
};

const getScreens = content => {
  const drawerScreens = [];

  if (content != null && content.length > 0) {
    content.forEach(screen => {
      drawerScreens.push(
        <Drawer.Screen key={screen.name} name={screen.name} kerala={true}>
          {props => <DrawerScreen {...props} screen={screen} />}
        </Drawer.Screen>,
      );
    });
  }
  return drawerScreens;
};
function DrawerNavigation({drawerObj}) {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        {...drawerObj['drawerNavigatorProps']}
        initialRouteName={drawerObj['content'][0]['name']}>
        {getScreens(drawerObj['content'])}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default DrawerNavigation;
