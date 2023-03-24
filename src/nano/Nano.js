import React, {useEffect, useRef, useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';

import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {isFunction} from '../utils/Utilities';
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

  const clonedElements = cloneDeep(uiElements);

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
  const onLongPressCallBack = modifiedElements => {
    if (modifiedElements) {
      setUiElements(modifiedElements);
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
