import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';

import {ScrollView, SafeAreaView} from 'react-native';
import {
  executeAFunction,
  modifyElemObjAsPerTheme,
  modifyNestedValue,
} from '../utils/Utilities';
import RenderColoumViews from './RenderColumnAndRows';
import {
  getElementObjectByKey,
  getNameSHortcutObject,
  traverseThroughInputJsonAndCreateNameShortcut,
} from '../utils/UiKeysMapper';
import {GetContextProvider} from '../context/DataContext';
import {useFocusEffect} from '@react-navigation/native';
interface ScreenProps {
  screen: any;
  style: any;
  navigation: any;
  scroll: boolean;
  logicObject: any;
  onStart: string;
  onEnd: string;
  route: any;
  moduleParameters: any;
  themes: any;
  onPause: string;
  onResume: string;
  scrollViewProps: any;
  packages;
}
const Screen: React.FC<ScreenProps> = ({
  screen,
  style,
  navigation,
  scroll,
  logicObject,
  onStart,
  onEnd,
  route,
  moduleParameters,
  themes,
  onPause,
  onResume,
  packages,

  scrollViewProps,
}): ReactElement => {
  const uiElementsRef = useRef(cloneDeep(screen));
  const [uiElements, setUiElements] = useState(uiElementsRef.current);
  const context = GetContextProvider();
  const defaultScreensRef = useRef(null);

  const clonedScreenStyles = cloneDeep(style);

  const getUi = (nameKey: string) => {
    return getElementObjectByKey(uiElementsRef.current, nameKey);
  };

  const propParameters = {
    navigation,

    route,
    ...moduleParameters,
  };

  useEffect(() => {

    if (!isEqual(defaultScreensRef.current, screen)) {
      defaultScreensRef.current = cloneDeep(screen);

      uiElementsRef.current = screen;
      setUiElements(uiElementsRef.current);
    } else {
      setUiElements(uiElementsRef.current);
    }
  }, [screen]);

  useFocusEffect(
    useCallback(() => {
      let createShortCutTimeout = setTimeout(() => {
        traverseThroughInputJsonAndCreateNameShortcut(
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
      traverseThroughInputJsonAndCreateNameShortcut(uiElementsRef.current, []);

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
  }, [screen]);
  const onSetUiCallBack = (
    key: string | null = null,
    valueObject: any = null,
    commit = true,
  ) => {
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

  let screenStylesWithThemet = clonedScreenStyles;
  if (themes != null && themes.length > 0) {
    screenStylesWithThemet = modifyElemObjAsPerTheme(
      clonedScreenStyles,
      themes,
      context,
    );
  }

  if (scroll) {
    let scrollViewPropsWithTheme = scrollViewProps;
    if (themes != null && themes.length > 0) {
      scrollViewPropsWithTheme = modifyElemObjAsPerTheme(
        scrollViewProps,
        themes,
        context,
      );
    }

    return (
      <ScrollView {...scrollViewPropsWithTheme}>
        {uiElements != null && (
          <RenderColoumViews
            unModifiedTotalData={cloneDeep(uiElementsRef.current)}
            navigation={navigation}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onSetUiCallBack}
            getUi={getUi}
            themes={themes}
            packages={packages}
            context={context}
          />
        )}
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={screenStylesWithThemet}>
      {uiElements != null && (
        <RenderColoumViews
          navigation={navigation}
          logicObject={logicObject}
          unModifiedTotalData={cloneDeep(uiElementsRef.current)}
          propParameters={propParameters}
          onPressCallBack={onSetUiCallBack}
          getUi={getUi}
          packages={packages}
          themes={themes}
          context={context}
        />
      )}
    </SafeAreaView>
  );
};
export default Screen;
