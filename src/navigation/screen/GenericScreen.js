import {useEffect, useRef, useState} from 'react';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import getModuleParams from '../../modules';
import Nano from '../../nano/Nano';

import {fetchScreenFromDb} from '../../modules/dbSync/DBSync';
import {RELOAD_TIME} from '../../../../../nano.config';
import {EventRegister} from 'react-native-event-listeners';

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
    fetchScreenFromDb({
      screenUrl: uri,
    })
      .then(screenN => {
        if (__DEV__) {
          timeut = setTimeout(() => {
            fetchScreenFromNetwork(uri);
          }, RELOAD_TIME);
        }

        setScreenData(screenN);
      })
      .catch(e => {});
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
    if (isMultiScreen && screenUrl != null) {
      fetchScreenFromNetwork(screenUrl);
    }
    EventRegister.addEventListener('nano-single-screen-load', url => {
      if (url && screenUrl && url === screenUrl) {
        fetchScreenFromNetwork(screenUrl);
      }
    });

    return () => {
      if (timeut) {
        clearTimeout(timeut);
      }
    };
  }, []);
  useEffect(() => {
    setScreenData(screenObj);
  }, [screenObj]);

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
      onPause={screenData != null ? screenData.onPause : null}
      onResume={screenData != null ? screenData.onResume : null}
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
