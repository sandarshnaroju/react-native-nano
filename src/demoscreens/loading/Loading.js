import NANO from '../../utils/Constants';

let activityIndicator = {
  component: NANO.ACTIVITY_INDICATOR,
  value: 'Loading...',

  props: {
    style: {
      fontSize: 20,

      marginTop: 20,
      marginHorizontal: 20,
    },
  },
};

let LoadingScreen = {
  name: 'NANO_Welcome',
  screen: {
    v1: [activityIndicator],
  },
  // logic: LoadingScreenFunctions,
  style: {flex: 1, justifyContent: 'center'},

  screenProps: {options: {headerShown: false}},
};

export default LoadingScreen;
