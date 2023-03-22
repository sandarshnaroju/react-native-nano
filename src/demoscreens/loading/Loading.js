import NANO from '../../utils/Constants';
const Heading = {
  component: NANO.TEXT,
  value: 'Welcome',

  props: {
    style: {
      fontSize: 34,

      alignSelf: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
  },
  onClick: 'textpress',
};
const SubHeading = {
  component: NANO.TEXT,
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

const WelcomeScreen = {
  name: 'Welcome',
  screen: {
    v1: [activityIndicator],
  },
  // logic: WelcomeScreenFunctions,
  style: {flex: 1, justifyContent: 'center'},

  onStart: 'onWelcomeScreenStart',
  onEnd: 'onWelcomeScreenEnd',
  screenProps: {options: {headerShown: false}},
};

export default WelcomeScreen;
