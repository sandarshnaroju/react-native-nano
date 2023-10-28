import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import getModuleParams from '../../modules';
import GenericScreen from './GenericScreen';
import LoadingScreen from '../../demoscreens/loading/Loading';
import {fetchAllScreens} from '../../modules/nano-sync/NanoSync';
import {Provider} from 'react-native-paper';
import DataContext from '../../context/DataContext';
import {THEMES} from '../../../../../nano.config';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

enableScreens();

const RNNano = ({
  screens,
  uriScreens,
  clientId,
  customComponents,
  customModules,
  themes,
}) => {
  const [networkScreens, setNetworkScreens] = useState([]);
  if (themes == null) {
    themes = THEMES;
  }
  let database;
  if (screens == null) {
    screens = [LoadingScreen];
  }

  // console.log('hehhehehehhe');

  const getAllScreensData = () => {
    // fetchAllScreens()
    //   .then(s => {
    //     setNetworkScreens(s);
    //   })
    //   .catch(e => {});
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
    getAllScreensData();
  }, []);

  return (
    <Provider>
      <DataContext themes={themes}>
        <NavigationContainer>
          <Stack.Navigator>
            {networkScreens != null && networkScreens.length > 0
              ? networkScreens.map((screnObj, index) => {
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
              : screens != null && screens.length > 0
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
      </DataContext>
    </Provider>
  );
};

export default RNNano;
