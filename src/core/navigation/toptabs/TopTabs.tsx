import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TopTabScreen, {Screen} from './TopTabScreen';
import {modifyElemObjAsPerTheme} from '../../utils/Utilities';
const Tab = createMaterialTopTabNavigator();
// interface Screen {
//   name: string;
//   props?: {
//     screenProps?: any;
//   };
// }

interface GetScreensProps {
  content: Screen[];
  navigation: any; // Adjust type as per your navigation object type
  // unModifiedScreen: any;
  themes: any;
  moduleParameters: any;
  // context: any;
  packages;
  [key: string]: any;
}
const GetScreens = ({
  content,
  navigation,
  // unModifiedScreen,
  themes,
  moduleParameters,
  // context,
  packages,
}: GetScreensProps): any[] => {
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
              // unModifiedScreen={unModifiedScreen}
              // context={context}
              packages={packages}
            />
          )}
        </Tab.Screen>,
      );
    });
  }
  return drawerScreens;
};
interface DrawerObj {
  navigatorProps: any; // Adjust type as per your navigatorProps type
  content: any[]; // Adjust type as per your content type
}
interface NanoTabsProps {
  drawerObj: DrawerObj;
  navigation: any; // Adjust type as per your navigation object type
  // unModifiedScreen: any;
  themes: any[];
  moduleParameters: any;
  context: any;
  packages;
}
const NanoTopTabs: React.FC<NanoTabsProps> = ({
  drawerObj,
  navigation,
  // unModifiedScreen,
  themes,
  moduleParameters,
  context,
  packages,
}) => {
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
        navigation,
        moduleParameters: moduleParameters,
        themes: themes,
        // unModifiedScreen: unModifiedScreen,
        // context,
        packages,
      })}
    </Tab.Navigator>
  );
};

export default NanoTopTabs;
