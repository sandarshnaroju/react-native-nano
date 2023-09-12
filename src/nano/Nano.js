import React, {useEffect, useRef, useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';

import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {executeAFunction, modifyNestedValue} from '../utils/Utilities';
import RenderColoumViews from './RenderColumnAndRows';
import {
  getElementObjectByKey,
  getNameSHortcutObject,
  traverseThroughInputJsonAndCreateNameSHortcut,
} from '../utils/UiKeysMapper';
import {useLayoutEffect} from 'react';

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
  const uiElementsRef = useRef(screen);
  const [uiElements, setUiElements] = useState(uiElementsRef.current);

  const customeCompsRef = useRef(customComponents);

  const clonedElementsRef = cloneDeep(uiElements);
  // console.log('nanoo', clonedElementsRef['v1']);
  const getUi = nameKey => {
    // console.log('uiellele', uiElementsRef.current);

    return getElementObjectByKey(uiElementsRef.current, nameKey);
  };

  const propParameters = {
    navigation,
    // uiElements: clonedElementsRef,
    // getUi: getUi,

    route,
    ...moduleParameters,
  };

  useEffect(() => {
    uiElementsRef.current = screen;
    setUiElements(uiElementsRef.current);
  }, [screen]);
  useEffect(() => {
    let createShortCutTimeout = setTimeout(() => {
      // console.log('callled traverse function', uiElementsRef.current);

      traverseThroughInputJsonAndCreateNameSHortcut(uiElementsRef.current, []);
      if (onStart != null) {
        // console.log('onStart', clonedElementsRef, uiElementsRef.current);
        if (logicObject != null && logicObject[onStart] != null) {
          logicObject[onStart]({...propParameters, setUi: onPressCallBack});
        } else {
          executeAFunction(onStart, {
            ...propParameters,
            setUi: onPressCallBack,
          });
        }
      }
    }, 1);
    return () => {
      if (createShortCutTimeout) {
        clearTimeout(createShortCutTimeout);
      }
      // if (onEnd != null) {
      //   if (logicObject != null && logicObject[onEnd] != null) {
      //     logicObject[onEnd]({...propParameters, setUi: onPressCallBack});
      //   } else {
      //     executeAFunction(onEnd, {
      //       ...propParameters,
      //       setUi: onPressCallBack,
      //     });
      //   }
      // }
    };
  }, [screenName, route]);

  const onPressCallBack = (key = null, keyObject = null, commit = true) => {
    // if (modifiedElements) {
    //   const cloned = cloneDeep(modifiedElements);
    //   uiElementsRef.current = cloned;
    //   setUiElements(uiElementsRef.current);
    // }
    if (key != null) {
      const objNameShortcuts = getNameSHortcutObject();
      const pathArray = objNameShortcuts[key];
      if (pathArray && pathArray.length > 0) {
        const cloned = cloneDeep(uiElementsRef.current);

        modifyNestedValue(cloned, pathArray, keyObject);

        if (commit) {
          uiElementsRef.current = cloned;
          setUiElements(uiElementsRef.current);
        }
      }
    }
  };

  const onLongPressCallBack = modifiedElements => {
    if (modifiedElements) {
      const cloned = cloneDeep(modifiedElements);
      uiElementsRef.current = cloned;
      setUiElements(uiElementsRef.current);
    }
  };

  // console.log('traversingg', uiElementsRef.current);

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
            getUi={getUi}
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
          getUi={getUi}
        />
      )}
    </View>
  );
};
export default Nano;
