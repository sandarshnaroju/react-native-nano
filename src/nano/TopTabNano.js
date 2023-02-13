import {cloneDeep, isFunction} from 'lodash';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {getDatabase} from '../database/RealmDatabase';
import {getNotification} from '../notifications/Notifications';
import {getPermissionInstance} from '../permissions/Permissions';
import RenderColoumViews from './RenderColumnAndRows';

export const TopTabNano = ({
  screen,
  style,
  navigation,
  scroll,
  logicObject,
  screenName,
  onStart,
  onEnd,
  route,
  databaseConfigObject,
}) => {
  const [uiElements, setUiElements] = useState(screen);

  const database = getDatabase(databaseConfigObject);
  const notification = getNotification();
  const Permissions = getPermissionInstance();
  // const filteredElements = getFilteredScreenObject(uiElements);
  const clonedElements = cloneDeep(uiElements);
  const logicParameters = {
    navigation,
    uiElements: clonedElements,

    db: database,
    route,
    notification,
    Permissions,
  };

  useEffect(() => {
    setUiElements(screen);
  }, [screen]);
  useEffect(() => {
    if (onStart != null) {
      const isItFunction = isFunction(onStart);
      if (isItFunction) {
        setUiElements(onStart({...logicParameters}));
      } else {
        if (logicObject != null && logicObject[onStart] != null) {
          setUiElements(logicObject[onStart]({...logicParameters}));
        }
      }
    }

    return () => {
      if (onEnd != null) {
        const isItFunction = isFunction(onEnd);
        if (isItFunction) {
          setUiElements(onEnd({...logicParameters}));
        } else {
          if (logicObject != null && logicObject[onEnd] != null) {
            setUiElements(logicObject[onEnd]({...logicParameters}));
          }
        }
      }
    };
  }, [screenName]);

  const onPressCallBack = modifiedElements => {
    setUiElements(modifiedElements);
  };
  if (scroll) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={style}>
        {uiElements != null && (
          <RenderColoumViews
            totalData={uiElements}
            navigation={navigation}
            logicObject={logicObject}
            logicParameters={logicParameters}
            onPressCallBack={onPressCallBack}
            route={route}
            databaseConfigObject={databaseConfigObject}
          />
        )}
      </ScrollView>
    );
  }

  return (
    <View style={[style, {flex: 1}]}>
      {uiElements != null && (
        <RenderColoumViews
          totalData={uiElements}
          navigation={navigation}
          logicObject={logicObject}
          logicParameters={logicParameters}
          onPressCallBack={onPressCallBack}
          route={route}
          databaseConfigObject={databaseConfigObject}
        />
      )}
    </View>
  );
};
// export default TopTabNano;
