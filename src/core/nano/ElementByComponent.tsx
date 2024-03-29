import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import React from 'react';

import {getPlatform} from '../modules/platform/platform';
import NANO from '../../Constants';
import {
  getInterceptedFunctionProps,
  getViewItems,
  modifyElemObjAsPerTheme,
  onElementLoaded,
} from '../utils/Utilities';

import {animateUi} from '../hooks/UseReanimationHook';

import ReanimatedHOC from './ReanimatedHOC';

import UIPackages from '../../libs';
import {packages as ConfigPackages} from '../../../../../nano.config';

interface Props {
  getUi: () => void;
  onPressCallBack: () => void;

  index: number;
  [key: string]: any;
}
const getElementAsPerComponent: React.FC<Props> = ({
  elemOb,
  index = null,

  recyclerListViewFunctionProps,
  propParameters,
  onPressCallBack,
  getUi,

  uniqueKey,
  themes,
  context,
  componentParams,
  packages,
}) => {
  let elemObjAfterThemesSet = elemOb;

  if (themes != null && themes.length > 0) {
    elemObjAfterThemesSet = modifyElemObjAsPerTheme(elemOb, themes, context);
  }

  if (
    elemObjAfterThemesSet != null &&
    elemObjAfterThemesSet['component'] != null
  ) {
    if (
      elemObjAfterThemesSet['hide'] != null &&
      elemObjAfterThemesSet['hide'] == true
    ) {
      return null;
    }
    if (
      elemObjAfterThemesSet['platform'] != null &&
      elemObjAfterThemesSet['platform'].length > 0 &&
      !elemObjAfterThemesSet['platform'].includes(getPlatform())
    ) {
      return null;
    }

    let funProps = null;

    if (recyclerListViewFunctionProps != null) {
      funProps = recyclerListViewFunctionProps;

      // this has to be for the parent view of the itemview. Its children wont have recyclerListViewFunctionProps
    } else {
      funProps = getInterceptedFunctionProps({
        eleObject: elemObjAfterThemesSet,

        props: {
          moduleParams: {...propParameters, theme: context},
          componentParams,

          setUi: onPressCallBack,
          getUi: getUi,
          animateUi: animateUi,
        },
      });
    }

    const elementProps = {
      ...elemObjAfterThemesSet,
      ...funProps,
    };

    const renderChildren = (
      contentArr,
      shouldOnpPressAllowed,
      onComponentLoaded,
      uniKey = uniqueKey,
    ) => {
      return getViewItems({
        content: contentArr,
        getUi,

        onPressCallBack,
        propParameters,
        recyclerListViewFunctionProps,
        uniqueKey: uniKey,
        themes,
        componentParams,
      });
    };

    // ! onPressCallback is a function that takes the complete JSON data and setstates it.
    // ! Use this funtion to modify UI.
    const onElementLoad = loadedElemObject => {
      onElementLoaded({
        getUi: getUi,
        onPressCallBack: onPressCallBack,
        loadedElemObject,
        propParameters: propParameters,
      });
    };
    if (elemObjAfterThemesSet['component'] === 'view') {
      return (
        <View key={'view' + index} {...elementProps['props']} {...elementProps}>
          {getViewItems({
            content: elemObjAfterThemesSet['content'],
            getUi,

            onPressCallBack,
            propParameters,
            recyclerListViewFunctionProps,
            uniqueKey,
            themes,
            componentParams,
          })}
        </View>
      );
    }
    let totalPackages = [];
    if (ConfigPackages != null && ConfigPackages.length > 0) {
      totalPackages = [...UIPackages, ...ConfigPackages];
    } else if (packages != null && packages.length > 0) {
      totalPackages = [...UIPackages, ...packages];
    } else {
      totalPackages = UIPackages;
    }

    if (totalPackages != null && totalPackages.length > 0) {
      const requiredPackageObj = totalPackages.find(p => {
        const packageName =
          elemObjAfterThemesSet['package'] != null
            ? elemObjAfterThemesSet['package']
            : 'react-native-paper';

        if (p.name === packageName) {
          return true;
        }
        return false;

        // return true;
      });

      if (
        requiredPackageObj != null &&
        requiredPackageObj.package != null &&
        requiredPackageObj.package.components != null
      ) {
        const requiredComponentObj = requiredPackageObj.package.components.find(
          t => t.name == elemObjAfterThemesSet['component'],
        );
        if (requiredComponentObj.name == NANO.VIEW) {
          if (
            elementProps &&
            elementProps['animation'] != null &&
            elementProps['animation']['advanced'] != null
          ) {
            return (
              <ReanimatedHOC
                elementProps={elementProps}
                getViewItems={renderChildren}
                onElementLoaded={onElementLoad}
                elemObjAfterThemesSet={elemObjAfterThemesSet}
                index={index}
              />
            );
          }
          if (elemObjAfterThemesSet['onPress'] != null) {
            return (
              <TouchableOpacity
                key={'TouchableOpacity' + index}
                {...elementProps['props']}
                {...elementProps}>
                {getViewItems({
                  content: elemObjAfterThemesSet['content'],
                  getUi,

                  onPressCallBack,
                  propParameters,
                  recyclerListViewFunctionProps,
                  uniqueKey,
                  themes,
                  componentParams,
                })}
              </TouchableOpacity>
            );
          }

          return (
            <View
              key={'view' + index}
              {...elementProps['props']}
              {...elementProps}>
              {getViewItems({
                content: elemObjAfterThemesSet['content'],
                getUi,

                onPressCallBack,
                propParameters,
                recyclerListViewFunctionProps,
                uniqueKey,
                themes,
                componentParams,
              })}
            </View>
          );
        }
        if (
          requiredComponentObj != null &&
          requiredComponentObj.component !== null
        ) {
          const Component = requiredComponentObj.component;
          if (
            elementProps &&
            elementProps['animation'] != null &&
            elementProps['animation']['advanced'] != null
          ) {
            return (
              <ReanimatedHOC
                elementProps={elementProps}
                getViewItems={renderChildren}
                onElementLoaded={onElementLoad}
                elemObjAfterThemesSet={elemObjAfterThemesSet}
                Component={Component}
                requiredPackageObj={requiredPackageObj}
                index={index}
              />
            );
          } else {
            return (
              <Component
                elementProps={elementProps}
                key={'button' + index}
                onElementLoaded={onElementLoad}
                getViewItems={renderChildren}
                animatedProps={null}
                animatedStyles={null}
              />
            );
          }
        }
      }
    }
  }
  return <Text key={'error' + index}> {'No such component'} </Text>;
};

export default getElementAsPerComponent;
