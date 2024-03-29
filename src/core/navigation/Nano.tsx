import {useEffect, useState} from 'react';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import getModuleParams from '../modules';
import Screen from '../nano/Screen';

import {fetchScreenFromDb} from '../modules/dbSync/DBSync';
import {RELOAD_TIME} from '../../../../../nano.config';
import {EventRegister} from 'react-native-event-listeners';
import NANO from '../../Constants';

type NanoValue = keyof typeof NANO;

type hor = 'v1' | 'h1';
interface component {
  name?: string;
  component: NanoValue;
}

export interface ScreenObjType {
  name: string;
  screen: {
    [key: hor]: component[];
  };
  props?: {
    style?: React.CSSProperties;
  };
  screenProps?: {
    options?: {
      headerShown?: boolean;
    };
  };
  [key: string]: any;
}
type Props = {
  navigation;
  logic;

  screenObj: ScreenObjType;
  screenUrl: string | null;
  isMultiScreen: boolean;
  moduleParameters;
  themes;
  packages;
};
export const Nano = ({
  navigation,
  logic,

  screenObj,
  screenUrl = null,
  isMultiScreen,
  moduleParameters,
  themes,
  packages,
}: Props) => {
  const route = navigation ? useRoute() : null;
  const [screenData, setScreenData] = useState(screenObj);

  let database;
  var timeut = null;

  const fetchScreenFromNetwork = (uri: string): void => {
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
      if (url && screenUrl && url == screenUrl) {
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
    <Screen
      scroll={
        screenData != null &&
        screenData.props != null &&
        screenData.props.scroll != null
          ? screenData.props.scroll
          : false
      }
      scrollViewProps={
        screenData != null &&
        screenData.props != null &&
        screenData.props.scrollViewProps != null
          ? screenData.props.scrollViewProps
          : {}
      }
      style={
        screenData != null && screenData.props != null && screenData.props.style
          ? screenData.props.style
          : {}
      }
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
      themes={themes}
      packages={packages}
    />
  );
};
