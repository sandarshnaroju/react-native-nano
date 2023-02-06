## Overview 

An introduction to the quickest way of developing complex mobile apps with negligible code.

## What is it ?

`react-native-nano` helps you to quickly develop complex mobile apps with negligible/low code. Here are some of the benefits you get out of the box when you use Nano.

 1. No need to manage any `state` variables. 
 2. Ease of creating new components using JSON.
 3. Easy to place components in `horizontal` and `vertical` directions.
 4. Ability for every component on the screen to access and change the every other component.
 5. Ability for most used methods to have control over `database`, `navigation`, `uiElements`, `natifications` and `session`.
 6. Separating Ui from Logic 100%.
 7. Ability to load UI (JSON) from your own server.

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
	    onClick: onClick: ({ navigation, uiElements}) => {
		
		// increase count by 1
		uiElements['v1'][0]['value'] = uiElements['v1'][0]['value'] + 1; 
		
	
		return uiElements;

	    })
	};

	// Finally adding both components to screen with v1(vertical) tag.
	const screen = {
	    name: 'WelcomeScreen',
	    screen: {
		v1: [countText, increaseCountButton],
	    },
	    style: { flex: 1, justifyContent: 'center' },
	};
	

Now add the above screen to the `RNNano` component as shown below in the App.js file.

  

	import {RNNano} from  'react-native-nano';
	...
	
	const  App = () => {
	    return <RNNano screens={[screen]} />;
	};
	export  default  App;
