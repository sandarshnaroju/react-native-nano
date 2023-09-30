import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import getModuleParams from '../../modules';
import Nano from '../../nano/Nano';
import NANO from '../../utils/Constants';
import NanoTopTabs from '../toptabs/TopTabs';
import {
  fetchScreenAndStoreInDb,
  fetchScreenFromDb,
} from '../../modules/nano-sync/NanoSync';
import {RELOAD_TIME} from '../../../../../nano.config';
// import getFirebase from '../../modules/firebase/Firebase';
// const Firebase = getFirebase();

const GenericScreen = ({
  navigation,
  logic,

  screenObj,
  screenUrl = null,
  isMultiScreen,
  customComponents,
  moduleParameters,
  themes,
}) => {
  const route = navigation ? useRoute() : null;
  const [screenData, setScreenData] = useState(screenObj);

  let database;
  var timeut = null;
  const fetchScreenFromNetwork = uri => {
    // console.log('fetching screen');

    fetchScreenFromDb({
      screenUrl: uri,
    })
      .then(screenN => {
        // console.log('total screen', screenN);

        // console.log(
        //   'Submit button',
        //   screenN['screen']['h1'][0]['content'][1],
        //   screenN['screen']['h1'][0]['content'][1]['onPress'],
        // );
        // if (__DEV__) {
        //   timeut = setTimeout(() => {
        //     // console.log('fetching again');

        //     fetchScreenFromNetwork(uri);
        //   }, RELOAD_TIME);
        // }

        setScreenData(screenN);
      })
      .catch(e => {
        console.log('eerer', e);
      });
  };

  const realDbInitCallback = db => {
    database = db;
    if (database != null) {
      if (screenUrl != null) {
        fetchScreenFromNetwork(screenUrl);
      }
    }
  };
  if (moduleParameters == null) {
    moduleParameters = getModuleParams({
      callBack: realDbInitCallback,
    });
  }

  useEffect(() => {
    // console.log(' in useeffect', isMultiScreen);

    if (isMultiScreen && screenUrl != null) {
      fetchScreenFromNetwork(screenUrl);
    }
    return () => {
      if (timeut) {
        clearTimeout(timeut);
      }
    };
  }, []);
  useEffect(() => {
    setScreenData(screenObj);
  }, [screenObj]);
  // const checkUpdatedScreenUrlAndChangeUi = async ({
  //   instantUpdate,
  //   remoteMessage,
  // }) => {
  //   const changedScreen = JSON.parse(remoteMessage['data']['updated']);
  //   const updatedUiElements = await fetchScreenAndStoreInDb({
  //     screenUrl: changedScreen['url'],
  //     code_hash: remoteMessage['data']['code_hash'],
  //   });
  //   // console.log('screen url', screenUrl, changedScreen['url']);

  //   if (
  //     screenUrl != null &&
  //     screenUrl === changedScreen['url'] &&
  //     instantUpdate
  //   ) {
  //     setScreenData(updatedUiElements);
  //   }
  // };
  // useEffect(() => {
  //   if (Firebase) {
  //     Firebase.getOnMessage(async remoteMessage => {
  //       if (
  //         remoteMessage != null &&
  //         remoteMessage['data'] != null &&
  //         remoteMessage['data']['updated'] != null
  //       ) {
  //         checkUpdatedScreenUrlAndChangeUi({
  //           instantUpdate: remoteMessage['data']['reload'],
  //           remoteMessage,
  //         });
  //       }
  //     });
  //   }
  //   if (Firebase) {
  //     return Firebase.unSubscribeOnMessage();
  //   }

  //   // if (Platform.OS == 'android') {
  //   //   const unsubscribe = messaging.default().onMessage(async remoteMessage => {
  //   //     if (
  //   //       remoteMessage != null &&
  //   //       remoteMessage['data'] != null &&
  //   //       remoteMessage['data']['updated'] != null
  //   //     ) {
  //   //       checkUpdatedScreenUrlAndChangeUi({
  //   //         instantUpdate: remoteMessage['data']['reload'],
  //   //         remoteMessage,
  //   //       });
  //   //     }
  //   //   });
  //   //   return unsubscribe;
  //   // }
  // }, []);
  // console.log('in genericscreen.js', screenData['screen']['v1'][0]['value']);
  if (screenData != null) {
    switch (screenData.component) {
      case NANO.TOP_TABS:
        return (
          <NanoTopTabs
            drawerObj={screenData}
            customComponents={customComponents}
          />
        );

      default:
        break;
    }
  }

  return (
    <Nano
      scroll={false}
      style={screenData != null && screenData.style ? screenData.style : {}}
      screen={screenData != null ? screenData.screen : null}
      navigation={navigation}
      logicObject={logic}
      screenName={screenData != null ? screenData.name : null}
      onStart={screenData != null ? screenData.onStart : null}
      onEnd={screenData != null ? screenData.onEnd : null}
      route={route}
      moduleParameters={moduleParameters}
      customComponents={customComponents}
      themes={themes}
    />
  );
};

// const areEqual = (prevProps, nextProps) => {
//   /*
//       return true if passing nextProps to render would return
//       the same result as passing prevProps to render,
//       otherwise return false
//       */
//   if (isEqual(nextProps, prevProps)) {
//     return true;
//   } else {
//     return false;
//   }
// };
export default GenericScreen;
