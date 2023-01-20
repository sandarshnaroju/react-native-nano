import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';
import {NANO} from '../../utils/Constants';
import {Nano} from '../../nano/Nano';
const Tab = createMaterialBottomTabNavigator();
const TabScreen = ({navigation, screen}) => {
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
        <Tab.Screen key={screen.name} name={screen.name}>
          {props => <TabScreen {...props} screen={screen} />}
        </Tab.Screen>,
      );
    });
  }
  return drawerScreens;
  // return null;
};
function BottomTopDrawerNavigator({screenComponent, bottomTabsObj}) {
  switch (screenComponent) {
    case NANO.BOTTOM_TABS:
      return (
        <Tab.Navigator>{getScreens(bottomTabsObj['content'])}</Tab.Navigator>
      );

    default:
      break;
  }
}

export default BottomTopDrawerNavigator;
