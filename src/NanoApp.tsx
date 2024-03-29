import React, {useEffect, useState} from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import getModuleParams from './core/modules';
import {Nano, ScreenObjType} from './core/navigation/Nano';
import LoadingScreen from './Loading';
import {EventRegister} from 'react-native-event-listeners';
import {fetchAllScreensFromDB} from './core/modules/dbSync/DBSync';
import {Provider} from 'react-native-paper';
import DataContext from './core/context/DataContext';
import {
  THEMES,
  APP_URL,
  CLIENT_SECRET,
  CLIENT_ID,
  NAVIGATION_LINKING,
  LOAD_PRIORITY,
} from '../../../nano.config';
import Toast from 'react-native-toast-message';
import {executeAFunction} from './core/utils/Utilities';
import UIPackages from './libs';

const Stack = createNativeStackNavigator();

enableScreens();
type screensType = ScreenObjType[];

type Props = {
  screens: screensType;
  props;
  uriScreens;
  clientId;
  themes;
  appStart;
  packages;
};
const NanoApp = ({
  screens,
  props,
  uriScreens,
  clientId,
  themes,
  packages,
  appStart,
}: Props) => {
  const [networkScreens, setNetworkScreens] = useState(null);
  const navigationRef = useNavigationContainerRef(null);
  if (themes == null) {
    themes = THEMES;
  }
  let database;

  if (screens == null) {
    screens = [LoadingScreen];
  }

  const checkIfScreenIsJustDeafultLoadingScreen = givenScreens => {
    if (givenScreens != null && givenScreens.length == 1) {
      if (
        givenScreens[0] != null &&
        typeof givenScreens[0] == 'object' &&
        givenScreens[0]['name'] == 'NANO_Welcome'
      ) {
        return true;
      }
      return false;
    }
    return false;
  };
  const shouldFetchScreensFromServer = () => {
    if (
      CLIENT_ID != null &&
      CLIENT_SECRET != null &&
      APP_URL != null &&
      CLIENT_ID.length > 6 &&
      CLIENT_SECRET.length > 6 &&
      APP_URL.indexOf('nanoapp.dev') > 0
    ) {
      return true;
    }
    return false;
  };

  const getAllScreensData = () => {
    if (LOAD_PRIORITY != null && LOAD_PRIORITY == 'dynamic') {
      fetchAllScreensFromDB()
        .then(s => {
          setNetworkScreens(s);
        })
        .catch(e => {});
    }
  };
  const realDbInitCallback = db => {
    database = db;
    if (database != null) {
      getAllScreensData();
    }
  };

  const defaultParameters = getModuleParams({
    callBack: realDbInitCallback,
  });
  const createCustomModuleObject = () => {
    let temp = {};
    if (UIPackages) {
      UIPackages.forEach(singlePackage => {
        const moduless = singlePackage?.package?.modules;
        if (moduless != null && moduless.length > 0) {
          moduless.forEach(singleModule => {
            temp[singleModule.name] = singleModule.module;
          });
        }
      });
    }

    return temp;
  };

  const moduleParameters = {
    ...createCustomModuleObject(),
    ...defaultParameters,
  };

  useEffect(() => {
    EventRegister.addEventListener('nano-all-screens-load', v => {
      if (v) {
        getAllScreensData();
      }
    });
  }, []);

  return (
    <Provider>
      <DataContext themes={themes}>
        {LOAD_PRIORITY && LOAD_PRIORITY == 'dynamic' ? (
          <NavigationContainer
            ref={navigationRef}
            onReady={e => {
              const moduleParametersWithNavigationRef = {
                ...createCustomModuleObject(),
                ...defaultParameters,
                navigation: navigationRef,
              };
              executeAFunction(appStart, {
                moduleParams: moduleParametersWithNavigationRef,
              });
            }}
            linking={NAVIGATION_LINKING}
            {...props?.navigationContainerProps}>
            <Stack.Navigator {...props?.stackNavigatorProps}>
              {LOAD_PRIORITY &&
              LOAD_PRIORITY == 'dynamic' &&
              networkScreens != null &&
              networkScreens.length > 0 ? (
                networkScreens.map((screnObj: ScreenObjType, index) => {
                  const screenProps =
                    screnObj != null &&
                    screnObj.props != null &&
                    screnObj.props.screenProps != null
                      ? screnObj.props.screenProps
                      : {};
                  return (
                    <Stack.Screen
                      key={screnObj.screen_identifier}
                      name={screnObj.name}
                      {...screenProps}>
                      {prop => (
                        <Nano
                          {...prop}
                          screenUrl={screnObj['url']}
                          isMultiScreen={true}
                          moduleParameters={moduleParameters}
                          themes={themes}
                          packages={packages}
                        />
                      )}
                    </Stack.Screen>
                  );
                })
              ) : (
                <Stack.Screen name={'Loading'} options={{headerShown: false}}>
                  {props => (
                    <Nano
                      {...props}
                      logic={LoadingScreen.logic}
                      screenObj={LoadingScreen}
                      isMultiScreen={true}
                      moduleParameters={moduleParameters}
                      themes={themes}
                      packages={packages}
                    />
                  )}
                </Stack.Screen>
              )}
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
        ) : (
          <NavigationContainer
            ref={navigationRef}
            linking={NAVIGATION_LINKING}
            onReady={e => {
              const moduleParametersWithNavigationRef = {
                ...createCustomModuleObject(),
                ...defaultParameters,
                navigation: navigationRef,
              };
              executeAFunction(appStart, {
                moduleParams: moduleParametersWithNavigationRef,
              });
            }}
            {...props?.navigationContainerProps}>
            <Stack.Navigator {...props?.stackNavigatorProps}>
              {screens != null && screens.length > 0
                ? screens.map((screenObj, index) => {
                    const screenProps =
                      screenObj != null &&
                      screenObj.props != null &&
                      screenObj.props.screenProps != null
                        ? screenObj.props.screenProps
                        : {};
                    return (
                      <Stack.Screen
                        key={screenObj.name}
                        {...screenProps}
                        name={screenObj.name}>
                        {props => (
                          <Nano
                            {...props}
                            logic={screenObj.logic}
                            screenObj={screenObj}
                            isMultiScreen={true}
                            moduleParameters={moduleParameters}
                            themes={themes}
                            packages={packages}
                          />
                        )}
                      </Stack.Screen>
                    );
                  })
                : null}
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
        )}
      </DataContext>
    </Provider>
  );
};

export default NanoApp;
