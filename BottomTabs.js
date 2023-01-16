import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Nano} from './Nano';

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

const HomeScreen = () => {
  return <View />;
};
function NanoBottomTabs({bottomTabsObj}) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={HomeScreen} />

        {/* {getScreens(bottomTabsObj['content'])} */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default NanoBottomTabs;
