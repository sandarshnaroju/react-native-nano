import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {enableScreens} from 'react-native-screens';
import GenericScreen from './GenericScreen';

const Stack = createNativeStackNavigator();
enableScreens();
export const RNNano = ({screens}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions={{animation: 'flip'}}>
        {screens.map((screenObj, index) => {
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
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// export default RNNano;
