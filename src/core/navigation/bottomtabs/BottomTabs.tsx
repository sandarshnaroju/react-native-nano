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
  customComponents: any;
  unModifiedScreen: any;
  themes: any;
  moduleParameters: any;
  context: any;
}
const GetScreens: React.FC<GetScreensProps> = ({
  content,
  navigation,
  customComponents,
  unModifiedScreen,
  themes,
  moduleParameters,
  context,
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
              customComponents={customComponents}
              moduleParameters={moduleParameters}
              themes={themes}
              context={context}
              unModifiedScreen={unModifiedScreen}
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
  customComponents: any;
  unModifiedScreen: any;
  themes: any[];
  moduleParameters: any;
  context: any;
}

const NanoBottomTabs: React.FC<NanoBottomTabsProps> = ({
  drawerObj,
  navigation,
  customComponents,
  unModifiedScreen,
  themes,
  moduleParameters,
  context,
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
        customComponents: customComponents,
        moduleParameters: moduleParameters,
        themes: themes,
        unModifiedScreen: unModifiedScreen,
        context,
      })}
    </Tab.Navigator>
  );
};

export default NanoBottomTabs;
