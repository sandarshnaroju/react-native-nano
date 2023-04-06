import {useEffect, useState} from 'react';
import React from 'react';
import {useRoute} from '@react-navigation/native';
// import isEqual from 'lodash/isEqual';
import getModuleParams from '../../modules';
// import {fetchScreen} from '../../modules/nano-sync/NanoSync';
import Nano from '../../nano/Nano';
import NANO from '../../utils/Constants';
import NanoTopTabs from '../toptabs/TopTabs';
import {fetchScreenFromDb} from '../../modules/nano-sync/NanoSync';
const GenericScreen = ({
  navigation,
  logic,

  screenObj,
  screenUrl = null,
  isMultiScreen,
  customComponents,
  moduleParameters,
}) => {
  const route = navigation ? useRoute() : null;
  const [screenData, setScreenData] = useState(screenObj);
  let database;

  const fetchScreenFromNetwork = uri => {
    fetchScreenFromDb({
      screenUrl: uri,
    })
      .then(screenN => {
        // console.log('ssc', screenN);
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
      // console.log('fetching in useeffect');
      fetchScreenFromNetwork(screenUrl);
    }
  }, []);
  useEffect(() => {
    setScreenData(screenObj);
  }, [screenObj]);
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
  // return (
  //   <View>
  //     {/* <Button icon={'camera'}> ICONS </Button> */}
  //     <Icon name="rocket" size={30} color="#900" />
  //   </View>
  // );

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
