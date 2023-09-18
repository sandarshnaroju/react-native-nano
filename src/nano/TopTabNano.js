import React, {useEffect, useRef, useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';
import isFunction from 'lodash/isFunction';

import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import getModuleParams from '../modules';
import RenderColoumViews from './RenderColumnAndRows';
import {
  getElementObjectByKey,
  getNameSHortcutObject,
  traverseThroughInputJsonAndCreateNameSHortcut,
} from '../utils/UiKeysMapper';
import {executeAFunction, modifyNestedValue} from '../utils/Utilities';
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
  const uiElementsRef = useRef(screen);
  const [uiElements, setUiElements] = useState(uiElementsRef.current);

  const clonedElements = cloneDeep(uiElements);
  const moduleParameters = getModuleParams({databaseConfigObject});
  const getUi = nameKey => {
    return getElementObjectByKey(uiElements, nameKey);
  };
  const propParameters = {
    navigation,
    // uiElements: clonedElements,
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
        const cloned = cloneDeep(uiElements);

        modifyNestedValue(cloned, pathArray, keyObject);

        if (commit) {
          uiElementsRef.current = cloned;
          setUiElements(uiElementsRef.current);
        }
      }
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
