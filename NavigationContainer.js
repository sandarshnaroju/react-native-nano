import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

function MyComponent(props) {
  return <NavigationContainer> {props.children} </NavigationContainer>;
}

export default MyComponent;
