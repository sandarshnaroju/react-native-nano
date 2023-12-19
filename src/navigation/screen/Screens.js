import React, {useEffect, useRef, useState} from 'react';

import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import getModuleParams from '../../modules';
import GenericScreen from './GenericScreen';
import LoadingScreen from '../../demoscreens/loading/Loading';
import {EventRegister} from 'react-native-event-listeners';
import {
  fetchAllScreens,
  fetchAllScreensFromDB,
} from '../../modules/dbSync/DBSync';
import {Provider, Text} from 'react-native-paper';
import DataContext from '../../context/DataContext';
import {
  THEMES,
  APP_URL,
  CLIENT_SECRET,
  CLIENT_ID,
  NAVIGATION_LINKING,
  LOAD_PRIORITY,
} from '../../../../../nano.config';
import Toast from 'react-native-toast-message';
import {executeAFunction} from '../../utils/Utilities';

const Stack = createNativeStackNavigator();

enableScreens();

const RNNano = ({
  screens,
  uriScreens,
  clientId,
  customComponents,
  customModules,
  themes,
  appStart,
}) => {
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
    if (LOAD_PRIORITY != null && LOAD_PRIORITY === 'dynamic') {
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

  const moduleParameters = {...customModules, ...defaultParameters};

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
        {LOAD_PRIORITY && LOAD_PRIORITY === 'dynamic' ? (
          <NavigationContainer
            ref={navigationRef}
            onReady={e => {
              const moduleParametersWithNavigationRef = {
                ...customModules,
                ...defaultParameters,
                navigation: navigationRef,
              };
              executeAFunction(appStart, {
                moduleParams: moduleParametersWithNavigationRef,
              });
            }}
            linking={NAVIGATION_LINKING}>
            <Stack.Navigator>
              {LOAD_PRIORITY &&
              LOAD_PRIORITY === 'dynamic' &&
              networkScreens != null &&
              networkScreens.length > 0 ? (
                networkScreens.map((screnObj, index) => {
                  return (
                    <Stack.Screen
                      key={screnObj.screen_identifier}
                      name={screnObj.name}
                      options={{headerShown: false}}
                      {...screnObj.screenProps}>
                      {props => (
                        <GenericScreen
                          {...props}
                          screenUrl={screnObj['url']}
                          isMultiScreen={true}
                          moduleParameters={moduleParameters}
                          customComponents={customComponents}
                          themes={themes}
                        />
                      )}
                    </Stack.Screen>
                  );
                })
              ) : (
                <Stack.Screen name={'Loading'} options={{headerShown: false}}>
                  {props => (
                    <GenericScreen
                      {...props}
                      logic={LoadingScreen.logic}
                      screenObj={LoadingScreen}
                      isMultiScreen={true}
                      moduleParameters={moduleParameters}
                      customComponents={customComponents}
                      themes={themes}
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
                ...customModules,
                ...defaultParameters,
                navigation: navigationRef,
              };
              executeAFunction(appStart, {
                moduleParams: moduleParametersWithNavigationRef,
              });
            }}>
            <Stack.Navigator>
              {screens != null && screens.length > 0
                ? screens.map((screenObj, index) => {
                    return (
                      <Stack.Screen
                        key={screenObj.name}
                        {...screenObj.screenProps}
                        name={screenObj.name}>
                        {props => (
                          <GenericScreen
                            {...props}
                            logic={screenObj.logic}
                            screenObj={screenObj}
                            isMultiScreen={true}
                            moduleParameters={moduleParameters}
                            customComponents={customComponents}
                            themes={themes}
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

export default RNNano;
