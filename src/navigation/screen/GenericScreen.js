import React, {useEffect, useState} from 'react';

import {useRoute} from '@react-navigation/native';
import {isEqual} from 'lodash';
import getModuleParams from '../../modules';
// import {fetchScreen} from '../../modules/nano-sync/NanoSync';
import Nano from '../../nano/Nano';
import NANO from '../../utils/Constants';
import NanoTopTabs from '../toptabs/TopTabs';
import {View} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
const GenericScreen = ({
  navigation,
  logic,

  screenObj,
  uri = null,
  isMultiScreen,
  customComponents,
  moduleParameters,
}) => {
  const route = navigation ? useRoute() : null;
  const [screenData, setScreenData] = useState(screenObj);
  let database;

  const fetchScreenFromNetwork = url => {
    // fetchScreen({
    //   screenUrl: url,
    // })
    //   .then(screenN => {
    //     console.log('ssc', screenN);
    //     setScreenData(screenN);
    //   })
    //   .catch(e => {
    //     console.log('eerer', e);
    //   });
  };

  const realDbInitCallback = db => {
    database = db;
    if (database != null) {
      if (uri != null) {
        fetchScreenFromNetwork(uri);
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

    if (isMultiScreen && uri != null) {
      // console.log('fetching in useeffect');
      fetchScreenFromNetwork(uri);
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

const areEqual = (prevProps, nextProps) => {
  /*
      return true if passing nextProps to render would return
      the same result as passing prevProps to render,
      otherwise return false
      */
  if (isEqual(nextProps, prevProps)) {
    return true;
  } else {
    return false;
  }
};
export default GenericScreen;
