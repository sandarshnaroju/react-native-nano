import React, {useEffect, useRef, useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';

import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {executeAFunction, isFunction} from '../utils/Utilities';
import RenderColoumViews from './RenderColumnAndRows';

const Nano = ({
  screen,
  style,
  navigation,
  scroll,
  logicObject,
  screenName,
  onStart,
  onEnd,
  route,
  moduleParameters,
  customComponents,
}) => {
  let database;
  const [uiElements, setUiElements] = useState(screen);
  const customeCompsRef = useRef(customComponents);

  const clonedElementsRef = cloneDeep(uiElements);
  // console.log('nanoo', clonedElementsRef['v1']);

  const propParameters = {
    navigation,
    uiElements: clonedElementsRef,

    route,
    ...moduleParameters,
  };

  useEffect(() => {
    setUiElements(screen);
  }, [screen]);
  useEffect(() => {
    if (onStart != null) {
      if (logicObject != null && logicObject[onStart] != null) {
        logicObject[onStart]({...propParameters, setUi: onPressCallBack});
      } else {
        executeAFunction(onStart, {
          ...propParameters,
          setUi: onPressCallBack,
        });
      }
    }

    return () => {
      if (onEnd != null) {
        if (logicObject != null && logicObject[onEnd] != null) {
          logicObject[onEnd]({...propParameters, setUi: onPressCallBack});
        } else {
          executeAFunction(onEnd, {
            ...propParameters,
            setUi: onPressCallBack,
          });
        }
      }
    };
  }, [screenName, route]);

  const onPressCallBack = modifiedElements => {
    if (modifiedElements) {
      const cloned = cloneDeep(modifiedElements);

      setUiElements(cloned);
    }
  };
  const onLongPressCallBack = modifiedElements => {
    if (modifiedElements) {
      const cloned = cloneDeep(modifiedElements);

      setUiElements(cloned);
    }
  };
  // console.log('NANO', customeCompsRef.current);

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
            customComponents={customeCompsRef.current}
            onLongPressCallBack={onLongPressCallBack}
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
          onLongPressCallBack={onLongPressCallBack}
          customComponents={customeCompsRef.current}
        />
      )}
    </View>
  );
};
export default Nano;
