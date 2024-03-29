import React from 'react';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import TopTabScreen from '../toptabs/TopTabScreen';
import {modifyElemObjAsPerTheme} from '../../utils/Utilities';

const Tab = createMaterialBottomTabNavigator();
interface Screen {
  name: string;
  props?: {
    screenProps?: any;
  };
}

interface GetScreensProps {
  content: Screen[];
  navigation: any; // Adjust type as per your navigation object type
  unModifiedScreen: any;
  themes: any;
  moduleParameters: any;
  context: any;
  packages;
}
const GetScreens: React.FC<GetScreensProps> = ({
  content,
  navigation,
  unModifiedScreen,
  themes,
  moduleParameters,
  context,
  packages,
}) => {
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
              context={context}
              unModifiedScreen={unModifiedScreen}
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
  // drawerObj: DrawerObject; // Adjust type as per your DrawerObject type
  // navigation: Navigation; // Adjust type as per your Navigation type
  unModifiedScreen: any;
  themes: any[];
  moduleParameters: any;
  context: any;
  packages;
}

const NanoBottomTabs: React.FC<NanoBottomTabsProps> = ({
  drawerObj,
  navigation,
  unModifiedScreen,
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
        navigation: navigation,
        moduleParameters: moduleParameters,
        themes: themes,
        unModifiedScreen: unModifiedScreen,
        context,
        packages,
      })}
    </Tab.Navigator>
  );
};

export default NanoBottomTabs;
