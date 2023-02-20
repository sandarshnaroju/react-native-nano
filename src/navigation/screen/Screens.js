import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {enableScreens} from 'react-native-screens';
import getDatabase from '../../modules/database/RealmDatabase';
import GenericScreen from './GenericScreen';

const Stack = createNativeStackNavigator();
enableScreens();

const RNNano = ({screens, uriScreens, clientId, databaseConfigObject}) => {
  useEffect(() => {
    getDatabase(databaseConfigObject);
  }, []);

  return (
    <NavigationContainer>
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
                      databaseConfigObject={databaseConfigObject}
                    />
                  )}
                </Stack.Screen>
              );
            })
          : uriScreens != null
          ? Object.keys(uriScreens).map((key, index) => {
              return (
                <Stack.Screen
                  key={key}
                  name={key}
                  options={{headerShown: false}}>
                  {props => <GenericScreen {...props} uri={uriScreens[key]} />}
                </Stack.Screen>
              );
            })
          : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RNNano;
