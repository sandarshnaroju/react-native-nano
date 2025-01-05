import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TopTabScreen from '../toptabs/TopTabScreen';
import {modifyElemObjAsPerTheme} from '../../utils/Utilities';

interface GetScreensProps {
  content: Screen[];
  navigation: any; // Adjust type as per your navigation object type
  themes: any;
  moduleParameters: any;
  packages;
}
const GetScreens = ({
  content,
  navigation,
  themes,
  moduleParameters,
  packages,
}: GetScreensProps) => {
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
        <Drawer.Screen {...screenProps} key={screen.name} name={screen.name}>
          {props => (
            <TopTabScreen
              {...props}
              screen={screen}
              navigation={navigation}
              moduleParameters={moduleParameters}
              themes={themes}
              packages={packages}
            />
          )}
        </Drawer.Screen>,
      );
    });
  }
  return drawerScreens;
};
const Drawer = createDrawerNavigator();
interface NanoDrawerProps {
  drawerObj: any;
  navigation: any;
  themes: any[];
  moduleParameters: any;
  context: any;
  packages;
}

const DrawerTabs = ({
  drawerObj,
  navigation,
  themes,
  moduleParameters,
  context,
  packages,
}: NanoDrawerProps) => {
  let navigatorPropsWithThemesSet = drawerObj.navigatorProps;
  if (themes != null && themes.length > 0) {
    navigatorPropsWithThemesSet = modifyElemObjAsPerTheme(
      drawerObj.navigatorProps,
      themes,
      context,
    );
  }
  return (
    <Drawer.Navigator {...navigatorPropsWithThemesSet}>
      {GetScreens({
        content: drawerObj['content'],
        navigation: navigation,
        moduleParameters: moduleParameters,
        themes: themes,
        packages,
      })}
    </Drawer.Navigator>
  );
};
export default DrawerTabs;
