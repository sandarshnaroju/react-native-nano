import React, {useEffect, useState} from 'react';

import {cloneDeep, isFunction} from 'lodash';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import getModuleParams from '../modules';
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
  customComponents,
}) => {
  const [uiElements, setUiElements] = useState(screen);

  const clonedElements = cloneDeep(uiElements);
  const moduleParameters = getModuleParams({databaseConfigObject});
  const propParameters = {
    navigation,
    uiElements: clonedElements,

    route,
    ...moduleParameters,
  };

  useEffect(() => {
    setUiElements(screen);
  }, [screen]);
  useEffect(() => {
    if (onStart != null) {
      const isItFunction = isFunction(onStart);
      if (isItFunction) {
        setUiElements(onStart({...propParameters}));
      } else {
        if (logicObject != null && logicObject[onStart] != null) {
          setUiElements(logicObject[onStart]({...propParameters}));
        }
      }
    }

    return () => {
      if (onEnd != null) {
        const isItFunction = isFunction(onEnd);
        if (isItFunction) {
          setUiElements(onEnd({...propParameters}));
        } else {
          if (logicObject != null && logicObject[onEnd] != null) {
            setUiElements(logicObject[onEnd]({...propParameters}));
          }
        }
      }
    };
  }, [screenName]);

  const onPressCallBack = modifiedElements => {
    if (modifiedElements) {
      setUiElements(modifiedElements);
    }
  };
  if (scroll) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={style}>
        {uiElements != null && (
          <RenderColoumViews
            totalData={uiElements}
            navigation={navigation}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onPressCallBack}
            route={route}
            databaseConfigObject={databaseConfigObject}
            customComponents={customComponents}
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
          propParameters={propParameters}
          onPressCallBack={onPressCallBack}
          route={route}
          databaseConfigObject={databaseConfigObject}
          customComponents={customComponents}
        />
      )}
    </View>
  );
};
// export default TopTabNano;
