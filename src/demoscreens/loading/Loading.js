import NANO from '../../utils/Constants';

const activityIndicator = {
  component: NANO.ACTIVITY_INDICATOR,
  value: 'Loading...',

  props: {
    style: {
      fontSize: 20,

      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 20,
      marginHorizontal: 20,
      textAlign: 'center',
    },
  },
  onClick: 'textpress',
};

const LoadingScreen = {
  name: 'Welcome',
  screen: {
    v1: [activityIndicator],
  },
  // logic: LoadingScreenFunctions,
  style: {flex: 1, justifyContent: 'center'},

  screenProps: {options: {headerShown: false}},
};

export default LoadingScreen;
