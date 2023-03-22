<p align="center">
  <img src="https://github.com/sandarshnaroju/react-native-nano/blob/master/nano-logo.png" />
</p>

## Overview 

Nano helps you to develop complex mobile apps with low code.

## What is it ?

`react-native-nano` helps you to quickly develop complex mobile apps with low code. Here are some of the benefits you get out of the box when you use Nano.

 1. No need to manage any `state` variables. 
 2. Ease of creating new components using JSON.
 3. Easy to place components in `horizontal` and `vertical` directions.
 4. Ability for every component on the screen to access and change the every other component.
 5. Ability for most used methods to have control over `database`, `navigation`, `uiElements`, `notifications` and `session`.
 6. Separating Ui from Logic 100%.
 7. Ability to load UI (JSON) from your own server.

## Documentation

For more detailed documentation please [click here](https://react-native-nano.gitbook.io/welcome/) 

## How to Install ?

#### For Existing Apps:
You can install `react-native-nano` in your react-native app by using the below command.

    npm install react-native-nano --save

#### For Newer Apps:
For newer apps, we recommend you to create new Nano app by using below command.

    npx rn-nano init MyFirstNanoProject
 
The above command will install necessary packages to run `react-native-nano` with `react-native` . You can use all `react-native` commands to `start` and `run` in Android and IOS.

## How to use ?

The following code is an app that increases number on button clicks.

``` javascript

import { NANO } from  'react-native-nano';
	
// creating a text component to display numbers starting from 1.
const  countText = {
    component:  NANO.TEXT,
    value:  1,
    props: {
	style: {
	    fontSize:  50,
	    alignSelf:  'center',
	    justifyContent:  'center',
	}
    }
};

// creating a button component to click and increase numbers.
const  increaseCountButton = {
    component:  NANO.BUTTON,
    value:  'CLICK ME TO INCREASE',
    onClick: ({ navigation, uiElements}) => {
	
	// increase count by 1
	uiElements['v1'][0]['value'] = uiElements['v1'][0]['value'] + 1; 
	

	return uiElements;
    })
};

// Finally adding both components to screen with v1(vertical) tag.
const screen = {
    name: 'CountScreen',
    screen: {
	v1: [countText, increaseCountButton],
    },
    style: { flex: 1, justifyContent: 'center' },
};

```	
Nano makes it easy to place components in horizontal and vertical directions in a screen. it uses keys `v1`, `v2`, `v3`, `v4`, `v5` .....  `vn` to place components vertically and uses keys `h1`, `h2`, `h3`, `h4`, `h5` ..... `hn` to place components horizontally. 

Now add the above screen to the `RNNano` component as shown below in the App.js file.

``` javascript
import {RNNano} from  'react-native-nano';
...
const  App = () => {
    return <RNNano screens={[screen]} />;
};
export  default  App;
```

The above code displays text and button. When button is clicked the count text gets increased.

### Adding multiple Screens

You can actually add as many screens as you want to RNNano component just like below

``` javascript
const  App = () => {
    return <RNNano screens={[
                             screen1, 
                             screen2, 
                             screen3, 
                             screen4
                             ...
                             
                             ]} />;
};
export  default  App;
```


### Dependencies 

react-native-nano depends on following packages

 1. [react navigation](https://reactnavigation.org/)
 2. [react native paper](https://reactnativepaper.com/)
 3. [realm](https://realm.io/)
 4. [recyclerlistview](https://github.com/Flipkart/recyclerlistview)
 4. [react native vector icons](https://oblador.github.io/react-native-vector-icons/)
 5. [react native animatable](https://github.com/oblador/react-native-animatable)
 6. [react native reanimated](https://github.com/software-mansion/react-native-reanimated)

