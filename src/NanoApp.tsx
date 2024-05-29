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
import * as NANOCONFIG from '../../../nano.config';
import Toast from 'react-native-toast-message';
import {executeAFunction} from './core/utils/Utilities';
import UIPackages from './libs';

const Stack = createNativeStackNavigator();

enableScreens();
type screensType = ScreenObjType[];

type Props = {
  screens: screensType;
  props;
  themes;
  appStart;
  packages;
  databaseSchema?;
};

const NanoApp = ({
  screens,
  props,
  themes,
  packages,
  appStart,
  databaseSchema,
  databaseName,
}: Props) => {
  const [networkScreens, setNetworkScreens] = useState(null);
  const navigationRef = useNavigationContainerRef();
  if (themes == null) {
    themes = NANOCONFIG.THEMES;
  }
  let database;

  if (screens == null) {
    screens = [LoadingScreen];
  }

  const getAllScreensData = () => {
    if (
      NANOCONFIG.LOAD_PRIORITY != null &&
      NANOCONFIG.LOAD_PRIORITY !== 'static'
    ) {
      fetchAllScreensFromDB()
        .then(s => {
          setNetworkScreens(s);
        })
        .catch(e => {
          // Handle error
        });
    }
  };
  const realDbInitCallback = db => {
    database = db;
    if (database != null) {
      getAllScreensData();
    }
  };

  const defaultParameters = getModuleParams({
    databaseSchema: databaseSchema,
    callBack: realDbInitCallback,
    databaseName: databaseName,
  });
  const createCustomModuleObject = () => {
    let temp = {};
    let customPackages = [];
    if (packages) {
      customPackages = packages;
    } else {
      if (NANOCONFIG != null && NANOCONFIG.packages != null) {
        customPackages = NANOCONFIG.packages;
      }
    }
    const totalPackages = [...UIPackages, ...customPackages];
    if (totalPackages) {
      totalPackages.forEach(singlePackage => {
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

  const runOnStartFunctionsOfPackages = moduleParametersWithNavigationRef => {
    let customPackages = [];
    if (packages) {
      customPackages = packages;
    } else {
      if (NANOCONFIG != null && NANOCONFIG.packages != null) {
        customPackages = NANOCONFIG.packages;
      }
    }

    customPackages.forEach(singlePackage => {
      const customAppStart = singlePackage?.appStart;
      executeAFunction(customAppStart, {
        moduleParams: moduleParametersWithNavigationRef,
      });
    });
  };

  return (
    <Provider>
      <DataContext themes={themes}>
        {NANOCONFIG.LOAD_PRIORITY && NANOCONFIG.LOAD_PRIORITY !== 'static' ? (
          <NavigationContainer
            ref={navigationRef}
            onReady={e => {
              const moduleParametersWithNavigationRef = {
                ...createCustomModuleObject(),
                ...defaultParameters,
                navigation: navigationRef,
              };
              runOnStartFunctionsOfPackages(moduleParametersWithNavigationRef);
              executeAFunction(appStart, {
                moduleParams: moduleParametersWithNavigationRef,
              });
            }}
            linking={NANOCONFIG['NAVIGATION_LINKING']}
            {...props?.navigationContainerProps}>
            <Stack.Navigator {...props?.stackNavigatorProps}>
              {NANOCONFIG.LOAD_PRIORITY &&
              NANOCONFIG.LOAD_PRIORITY == 'dynamic' &&
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
                      screen={LoadingScreen}
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
            linking={NANOCONFIG['NAVIGATION_LINKING']}
            onReady={e => {
              const moduleParametersWithNavigationRef = {
                ...createCustomModuleObject(),
                ...defaultParameters,
                navigation: navigationRef,
              };
              runOnStartFunctionsOfPackages(moduleParametersWithNavigationRef);

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
                            screen={screenObj}
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
