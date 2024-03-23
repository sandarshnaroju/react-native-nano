import NANO from './Constants';

let activityIndicator = {
  component: NANO.ACTIVITY_INDICATOR,
  value: 'Loading...',

  props: {
    style: {
      fontSize: 20,
      color: 'blue',
      marginTop: 20,
      marginHorizontal: 20,
    },
  },
};

let LoadingScreen = {
  name: '',
  screen: {
    v1: [activityIndicator],
  },
  props: {
    screenProps: {options: {headerShown: false}},
  },
  // logic: LoadingScreenFunctions,
  style: {flex: 1, justifyContent: 'center'},
};

export default LoadingScreen;
