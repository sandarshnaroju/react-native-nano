import React, {useCallback, useEffect, useRef, useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';

import {ScrollView, SafeAreaView, View} from 'react-native';
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
import {useFocusEffect} from '@react-navigation/native';

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
  onPause,
  onResume,
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

  useFocusEffect(
    useCallback(() => {
      let createShortCutTimeout = setTimeout(() => {
        traverseThroughInputJsonAndCreateNameSHortcut(
          uiElementsRef.current,
          [],
        );

        if (onResume != null) {
          if (logicObject != null && logicObject[onResume] != null) {
            logicObject[onResume]({
              moduleParams: propParameters,
              setUi: onSetUiCallBack,
              getUi,
            });
          } else {
            executeAFunction(onResume, {
              moduleParams: propParameters,
              setUi: onSetUiCallBack,
              getUi,
            });
          }
        }
      }, 1);
      return () => {
        if (createShortCutTimeout) {
          clearTimeout(createShortCutTimeout);
        }
        if (onPause != null) {
          if (logicObject != null && logicObject[onPause] != null) {
            logicObject[onPause]({
              moduleParams: propParameters,
              setUi: onSetUiCallBack,
              getUi,
            });
          } else {
            executeAFunction(onPause, {
              moduleParams: propParameters,
              setUi: onSetUiCallBack,
              getUi,
            });
          }
        }
      };
    }, []),
  );

  useEffect(() => {
    const createShortCutTimeout = setTimeout(() => {
      traverseThroughInputJsonAndCreateNameSHortcut(uiElementsRef.current, []);

      if (onStart != null) {
        if (logicObject != null && logicObject[onStart] != null) {
          logicObject[onStart]({
            moduleParams: propParameters,
            setUi: onSetUiCallBack,
            getUi,
          });
        } else {
          executeAFunction(onStart, {
            moduleParams: propParameters,
            setUi: onSetUiCallBack,
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
            setUi: onSetUiCallBack,
            getUi,
          });
        } else {
          executeAFunction(onEnd, {
            moduleParams: propParameters,
            setUi: onSetUiCallBack,
            getUi,
          });
        }
      }
    };
  }, []);

  const onSetUiCallBack = (key = null, valueObject = null, commit = true) => {
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
            onPressCallBack={onSetUiCallBack}
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
    <SafeAreaView style={[screenStylesWithThemet, {flex: 1}]}>
      {uiElements != null && (
        <RenderColoumViews
          totalData={uiElements}
          navigation={navigation}
          logicObject={logicObject}
          unModifiedTotalData={cloneDeep(clonedElementsRef.current)}
          propParameters={propParameters}
          onPressCallBack={onSetUiCallBack}
          onLongPressCallBack={onLongPressCallBack}
          customComponents={customeCompsRef.current}
          getUi={getUi}
          themes={themes}
        />
      )}
    </SafeAreaView>
  );
};
export default Nano;
