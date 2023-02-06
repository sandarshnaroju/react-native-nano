import {cloneDeep} from 'lodash';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {getDatabase} from '../database/RealmDatabase';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';

// const getFilteredScreenObject = entireScreenObject => {
//   const filterElements = {};
//   if (entireScreenObject != null) {
//     Object.entries(entireScreenObject).forEach(keyValueArr => {
//       filterElements[keyValueArr[0]] = keyValueArr[1].filter(
//         elem => elem['canChangeEffect'] !== false,
//       );
//     });
//   }

//   return filterElements;
// };

const isFunction = functionToCheck => {
  if (functionToCheck instanceof Function) {
    if (typeof functionToCheck === 'function') {
      if (
        Object.prototype.toString.call(functionToCheck) == '[object Function]'
      ) {
        return true;
      }
    }
  }
  return false;
};

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
  databaseConfigObject,
}) => {
  const [uiElements, setUiElements] = useState(screen);

  const database = getDatabase(databaseConfigObject);
  // const filteredElements = getFilteredScreenObject(uiElements);
  const clonedElements = cloneDeep(uiElements);
  const logicParameters = {
    navigation,
    uiElements: clonedElements,

    db: database,
    route,
  };

  const onElementPress = (eleObject, index, item, completeFlatlistData) => {
    if (
      logicObject != null &&
      eleObject != null &&
      eleObject['onClick'] != null
    ) {
      const isItFunction = isFunction(eleObject['onClick']);

      if (typeof eleObject['onClick'] !== 'string' && isItFunction) {
        setUiElements(
          eleObject['onClick']({
            index,
            item,
            completeFlatlistData,
            ...logicParameters,
          }),
        );
      } else {
        setUiElements(
          logicObject[eleObject['onClick']]({
            index,
            item,
            completeFlatlistData,
            ...logicParameters,
          }),
        );
      }
    }
  };
  const getRowElements = (rowElementsArray, rowKey) => {
    const rowelements = [];
    if (rowElementsArray != null && rowElementsArray.length > 0) {
      rowElementsArray.forEach((eleObject, index) => {
        rowelements.push(
          <CheckForListviewAndRender
            key={index + Math.random()}
            elemOb={eleObject}
            navigation={navigation}
            onPress={(index, item, completeFlatlistData) => {
              onElementPress(eleObject, index, item, completeFlatlistData);
            }}
          />,
        );
      });
    }
    return rowelements;
  };

  const getColoumViews = totalData => {
    const elements = [];
    if (totalData != null) {
      Object.keys(totalData).forEach((key, index) => {
        if (key != null && key.slice(0, 1) === 'h') {
          elements.push(
            <View
              style={{
                flexDirection: 'row',
              }}
              key={key + index + 1}>
              {getRowElements(totalData[key], key)}
            </View>,
          );
        } else if (key != null && key.slice(0, 1) === 'v') {
          elements.push(getRowElements(totalData[key], key));
        }
      });
    }

    return elements;
  };

  useEffect(() => {
    setUiElements(screen);
  }, [screen]);
  useEffect(() => {
    if (onStart != null) {
      setUiElements(logicObject[onStart]({...logicParameters}));
    }

    return () => {
      if (onEnd != null) {
        setUiElements(logicObject[onEnd]({...logicParameters}));
      }
    };
  }, [screenName]);
  if (scroll) {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={style}>
        {uiElements != null && getColoumViews(uiElements)}
      </ScrollView>
    );
  }
  return (
    <View style={style}>
      {uiElements != null && getColoumViews(uiElements)}
    </View>
  );
};

export default Nano;
