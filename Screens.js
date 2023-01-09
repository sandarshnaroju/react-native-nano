import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Nano} from './Nano';

const Stack = createNativeStackNavigator();

function GenericScreen({navigation, screen, logic}) {
  return (
    <Nano
      scroll={false}
      style={styles.viewStyle}
      screen={screen}
      navigation={navigation}
      logicObject={logic}
    />
  );
}

const RNNano = ({screens}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator defaultScreenOptions={{animation: 'flip'}}>
        {screens.map(screenObj => {
          return (
            <Stack.Screen
              key={screenObj.name}
              name={screenObj.name}
              options={{headerShown: false}}>
              {props => (
                <GenericScreen
                  {...props}
                  screen={screenObj.screen}
                  logic={screenObj.logic}
                />
              )}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default RNNano;
