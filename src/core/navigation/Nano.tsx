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

interface component {
  name?: string;
  component: NanoValue;
  [key: string]: any;
}

export interface ScreenObjType {
  name: string;
  screen: {
    [key: string]: component[];
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
  logic?;

  screen?: ScreenObjType;
  screenUrl?: string | null;
  isMultiScreen: boolean;
  moduleParameters;
  themes;
  packages;

  database?: object;
};
export const Nano = ({
  navigation,
  logic,

  screen,
  screenUrl = null,
  isMultiScreen,
  moduleParameters,
  themes,
  packages,
  database,
}: Props) => {
  const route = navigation ? useRoute() : null;
  const [screenData, setScreenData] = useState(screen);

  let databaseInstance;
  var timeut = null;

  const fetchScreenFromNetwork = (uri: string): void => {
    fetchScreenFromDb({
      screenUrl: uri,
      database: database,
    })
      .then(screenN => {
        if (__DEV__) {
          timeut = setTimeout(() => {
            fetchScreenFromNetwork(uri);
          }, RELOAD_TIME);
        }
        if (screenN) {
          navigation.setOptions(screenN?.props?.screenProps?.options);
        }

        setScreenData(screenN);
      })
      .catch(e => {});
  };

  const realDbInitCallback = db => {
    databaseInstance = db;
    if (databaseInstance != null) {
      if (screenUrl != null) {
        fetchScreenFromNetwork(screenUrl);
      }
    }
  };
  if (moduleParameters == null) {
    moduleParameters = getModuleParams({
      callBack: realDbInitCallback,

      database,
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
    setScreenData(screen);
  }, [screen]);

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
