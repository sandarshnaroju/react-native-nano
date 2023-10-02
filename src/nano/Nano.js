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

  const clonedElements = cloneDeep(screen);
  const clonedScreenStyles = cloneDeep(style);
  let elemObjAfterThemesSet = clonedScreenStyles;
  if (themes != null && themes.length > 0) {
    elemObjAfterThemesSet = modifyElemObjAsPerTheme(
      clonedScreenStyles,
      themes,
      context,
    );
  }

  // console.log('nanoo', clonedScreenStyles, style);
  const getUi = nameKey => {
    // console.log('uiellele', uiElementsRef.current);

    return getElementObjectByKey(clonedElements, nameKey);
  };

  const propParameters = {
    navigation,
    // uiElements: clonedElementsRef,
    // getUi: getUi,
    // theme: {
    //   dark: () => {
    //     console.log('dark called');

    //     if (moduleParameters != null && moduleParameters.session != null) {
    //       moduleParameters.session.setValue('theme', 'dark');
    //       const vaal = traverseThroughInputJsonAndCreateNameSHortcut(
    //         uiElementsRef.current,
    //         [],
    //       );
    //       uiElementsRef.current = vaal;
    //       setUiElements(uiElementsRef.current);
    //     }
    //   },
    //   light: () => {},
    // },

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
        // const clonedUnModified = cloneDeep(clonedElements);
        modifyNestedValue(cloned, pathArray, keyObject);
        // modifyNestedValue(clonedUnModified, pathArray, keyObject);
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

  // console.log('traversingg', uiElements['v1'][0]['value']);



  if (scroll) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={elemObjAfterThemesSet}>
        {uiElements != null && (
          <RenderColoumViews
            totalData={uiElements}
            unModifiedTotalData={clonedElements}
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
    <View style={[elemObjAfterThemesSet, {flex: 1}]}>
      {uiElements != null && (
        <RenderColoumViews
          totalData={uiElements}
          navigation={navigation}
          logicObject={logicObject}
          unModifiedTotalData={clonedElements}
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
