import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import GenericScreen from './GenericScreen';

const Stack = createNativeStackNavigator();
enableScreens();

const RNNano = ({screens, uriScreens, clientId, clientSecret}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions={{animation: 'flip'}}>
        {screens != null && screens.length > 0
          ? screens.map((screenObj, index) => {
              return (
                <Stack.Screen
                  key={screenObj.name}
                  name={screenObj.name}
                  options={{headerShown: false}}>
                  {props => (
                    <GenericScreen
                      {...props}
                      logic={screenObj.logic}
                      screenObj={screenObj}
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
