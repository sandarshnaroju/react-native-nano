import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import TopTabScreen from './TopTabScreen';
import {modifyElemObjAsPerTheme} from '../../utils/Utilities';
const Tab = createMaterialTopTabNavigator();
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
              unModifiedScreen={unModifiedScreen}
              context={context}
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
  customComponents: any;
  unModifiedScreen: any;
  themes: any[];
  moduleParameters: any;
  context: any;
}
const NanoTopTabs: React.FC<NanoTabsProps> = ({
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
        navigation,
        customComponents: customComponents,
        moduleParameters: moduleParameters,
        themes: themes,
        unModifiedScreen: unModifiedScreen,
        context,
      })}
    </Tab.Navigator>
  );
};

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
