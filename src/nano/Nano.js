import React, {useEffect, useRef, useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';

import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {
  executeAFunction,
  modifyElemObjAsPerTheme,
  modifyNestedValue,
} from '../utils/Utilities';
import RenderColoumViews from './RenderColumnAndRows';
import {
  getElementObjectByKey,
  getNameSHortcutObject,
  traverseThroughInputJsonAndCreateNameSHortcut,
} from '../utils/UiKeysMapper';
import {GetContextProvider} from '../context/DataContext';

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
  themes,
  unModifiedScreen,
}) => {
  const uiElementsRef = useRef(screen);
  const [uiElements, setUiElements] = useState(uiElementsRef.current);
  const context = GetContextProvider();

  const customeCompsRef = useRef(customComponents);

  const clonedElementsRef = useRef(cloneDeep(screen));
  const clonedScreenStyles = cloneDeep(style);

  const getUi = nameKey => {
    return getElementObjectByKey(clonedElementsRef.current, nameKey);
  };

  const propParameters = {
    navigation,

    route,
    ...moduleParameters,
  };

  useEffect(() => {
    clonedElementsRef.current = cloneDeep(screen);

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
          logicObject[onStart]({
            moduleParams: propParameters,
            setUi: onPressCallBack,
            getUi,
          });
        } else {
          executeAFunction(onStart, {
            moduleParams: propParameters,
            setUi: onPressCallBack,
            getUi,
          });
        }
      }
    }, 1);
    return () => {
      if (createShortCutTimeout) {
        clearTimeout(createShortCutTimeout);
      }
      if (onEnd != null) {
        if (logicObject != null && logicObject[onEnd] != null) {
          logicObject[onEnd]({
            moduleParams: propParameters,
            setUi: onPressCallBack,
            getUi,
          });
        } else {
          executeAFunction(onEnd, {
            moduleParams: propParameters,
            setUi: onPressCallBack,
            getUi,
          });
        }
      }
    };
  }, [screenName, route]);

  const onPressCallBack = (key = null, valueObject = null, commit = true) => {
    if (key != null) {
      const objNameShortcuts = getNameSHortcutObject();
      const pathArray = objNameShortcuts[key];
      if (pathArray && pathArray.length > 0) {
        const clonedTotalData = cloneDeep(uiElementsRef.current);

        modifyNestedValue(clonedTotalData, pathArray, valueObject);

        if (commit) {
          uiElementsRef.current = clonedTotalData;
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

  // console.log('traversingg', uiElements['v1'][0]['value']);
  let screenStylesWithThemet = clonedScreenStyles;
  if (themes != null && themes.length > 0) {
    screenStylesWithThemet = modifyElemObjAsPerTheme(
      clonedScreenStyles,
      themes,
      context,
    );
  }
  if (scroll) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={screenStylesWithThemet}>
        {uiElements != null && (
          <RenderColoumViews
            totalData={uiElements}
            unModifiedTotalData={cloneDeep(clonedElementsRef.current)}
            navigation={navigation}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onPressCallBack}
            customComponents={customeCompsRef.current}
            onLongPressCallBack={onLongPressCallBack}
            getUi={getUi}
            themes={themes}
          />
        )}
      </ScrollView>
    );
  }

  return (
    <View style={[screenStylesWithThemet, {flex: 1}]}>
      {uiElements != null && (
        <RenderColoumViews
          totalData={uiElements}
          navigation={navigation}
          logicObject={logicObject}
          unModifiedTotalData={cloneDeep(clonedElementsRef.current)}
          propParameters={propParameters}
          onPressCallBack={onPressCallBack}
          onLongPressCallBack={onLongPressCallBack}
          customComponents={customeCompsRef.current}
          getUi={getUi}
          themes={themes}
        />
      )}
    </View>
  );
};
export default Nano;
