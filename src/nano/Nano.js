import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {View} from 'react-native-animatable';
import {getDatabase} from '../database/RealmDatabase';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';
import {fetchScreen} from '../network/Network';

const getFilteredScreenObject = entireScreenObject => {
  const filterElements = {};
  if (entireScreenObject != null) {
    Object.entries(entireScreenObject).forEach(keyValueArr => {
      filterElements[keyValueArr[0]] = keyValueArr[1].filter(
        elem => elem['canChangeEffect'] !== false,
      );
    });
  }

  return filterElements;
};

const Nano = ({screen, style, navigation, scroll, logicObject}) => {
  const [uiElements, setUiElements] = useState(screen);
  const database = getDatabase();
  // const filteredElements = getFilteredScreenObject(uiElements);
  const getRowElements = (rowElementsArray, rowKey) => {
    const rowelements = [];
    if (rowElementsArray != null && rowElementsArray.length > 0) {
      rowElementsArray.forEach((eleObject, index) => {
        rowelements.push(
          <CheckForListviewAndRender
            key={index + Math.random()}
            elemOb={eleObject}
            navigation={navigation}
            onPress={async (index, item, completeFlatlistData) => {
              if (
                logicObject != null &&
                eleObject != null &&
                eleObject['onClick'] != null &&
                logicObject[eleObject['onClick']] != null
              ) {
                setUiElements(
                  await logicObject[eleObject['onClick']]({
                    navigation,
                    uiElements,
                    index,
                    item,
                    completeFlatlistData,
                    db: database,
                  }),
                );
              }
              // console.log('sssss');
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

  const fetchScreenObject = () => {
    fetchScreen(screen)
      .then(screenObject => {
        if (screenObject != null) {
          setUiElements(screenObject.screen);
          const Realm = getDatabase();
          Realm.setNanoConfig(screen, screenObject);
        }
      })
      .catch(e => {
        console.log('error', e);
      });
  };
  useEffect(() => {
    if (
      screen != null &&
      typeof screen == 'string' &&
      screen.includes('http')
    ) {
      fetchScreenObject();
    }
  }, [screen]);

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
