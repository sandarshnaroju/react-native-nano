import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TopTabScreen from './TopTabScreen';
const Tab = createMaterialTopTabNavigator();

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

function NanoTopTabs({drawerObj, navigation}) {
  return (
    <Tab.Navigator {...drawerObj.navigatorProps}>
      {GetScreens({content: drawerObj['content'], navigation})}
    </Tab.Navigator>
  );
}

export default NanoTopTabs;

// function areEqual(prevProps, nextProps) {
//   /*
//     return true if passing nextProps to render would return
//     the same result as passing prevPropos to render,
//     otherwise return false
//     */
//   if (isEqual(nextProps, prevProps)) {
//     return true;
//   } else {
//     return false;
//   }
// }
// export default React.memo(NanoTopTabs, areEqual);
