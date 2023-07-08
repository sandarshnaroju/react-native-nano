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
} from '../utils/UiKeysMapper';
import {modifyNestedValue} from '../utils/Utilities';
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
    uiElements: clonedElements,
    getUi: getUi,
    route,
    ...moduleParameters,
  };

  useEffect(() => {
    uiElementsRef.current = screen;
    setUiElements(uiElementsRef.current);
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
