import React, {useEffect, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {enableScreens} from 'react-native-screens';
import getModuleParams from '../../modules';
// import {fetchAllScreens} from '../../modules/nano-sync/NanoSync';
import GenericScreen from './GenericScreen';
import LoadingScreen from '../../demoscreens/loading/Loading';
import {fetchAllScreens} from '../../modules/nano-sync/NanoSync';
import {Provider} from 'react-native-paper';
const Stack = createNativeStackNavigator();
enableScreens();

const processCustomComp = custArray => {
  // const mod = [];
  // if (custArray && custArray.length > 0) {
  //   custArray.forEach(component => {
  //     const temp = {};
  //     temp.component = <component.component nanoProps={1} />;
  //     mod.push({...component, ...temp});
  //   });
  // }
  // return mod;
  return custArray;
};

const RNNano = ({
  screens,
  uriScreens,
  clientId,
  customComponents,
  customModules,
}) => {
  const [networkScreens, setNetworkScreens] = useState([]);

  let database;
  if (screens == null) {
    screens = [LoadingScreen];
  }
  const realDbInitCallback = db => {
    database = db;
    if (database != null) {
      fetchAllScreens()
        .then(s => {
          // console.log('all screens', s, typeof s);
          setNetworkScreens(s);
        })
        .catch(e => {
          // console.log('eeee', e);
        });
    }
  };
  const defaultParameters = getModuleParams({
    callBack: realDbInitCallback,
  });

  const moduleParameters = {...customModules, ...defaultParameters};

  useEffect(() => {
    fetchAllScreens()
      .then(s => {
        // console.log('all screens');
        setNetworkScreens(s);
      })
      .catch(e => {
        // console.log('eeee all screens', e);
      });
  }, []);
  const preProcessedCustomCompArray = processCustomComp(customComponents);
  return (
    <Provider>
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
                        customComponents={preProcessedCustomCompArray}
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
                        customComponents={preProcessedCustomCompArray}
                      />
                    )}
                  </Stack.Screen>
                );
              })
            : null}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default RNNano;
