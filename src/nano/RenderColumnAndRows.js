import {View} from 'react-native';
import CheckForListviewAndRender from '../elements/CheckForListviewAndRender';
import {isFunction} from '../utils/Utilities';
import React from 'react';

// const onElementPress = (
//   eleObject,
//   index,
//   itemData,
//   listData,
//   logicObject,
//   propParameters,
//   itemJson,
//   onPressCallBack,
//   getUi,
// ) => {
//   if (logicObject == null) {
//     if (eleObject != null && eleObject['onPress'] != null) {
//       const isItFunction = isFunction(eleObject['onPress']);
//       if (typeof eleObject['onPress'] !== 'string' && isItFunction) {
//         return eleObject['onPress']({
//           index,
//           itemData,
//           listData,
//           itemJson,
//           setUi: onPressCallBack,
//           getUi,

//           ...propParameters,
//         });
//       } else {
//         if (
//           eleObject != null &&
//           eleObject['onPress'] != null &&
//           typeof eleObject['onPress'] === 'string'
//         ) {
//           let copy = new Function('return ' + eleObject['onPress'])();

//           return copy({
//             index,
//             itemData,
//             listData,
//             itemJson,
//             setUi: onPressCallBack,
//             getUi,

//             ...propParameters,
//           });
//         }
//       }
//     }
//   } else {
//     if (eleObject != null && eleObject['onPress'] != null) {
//       const isItFunction = isFunction(eleObject['onPress']);

//       if (isItFunction) {
//         return eleObject['onPress']({
//           index,
//           itemData,
//           listData,
//           itemJson,
//           setUi: onPressCallBack,
//           getUi,
//           ...propParameters,
//         });
//       } else {
//         if (typeof eleObject['onPress'] === 'string') {
//           if (logicObject[eleObject['onPress']] != null) {
//             if (typeof logicObject[eleObject['onPress']] === 'string') {
//               let copy = new Function(
//                 'return ' + logicObject[eleObject['onPress']],
//               )();

//               return copy({
//                 index,
//                 itemData,
//                 listData,
//                 itemJson,
//                 setUi: onPressCallBack,
//                 getUi,
//                 ...propParameters,
//               });
//             }
//             if (typeof logicObject[eleObject['onPress']] === 'function') {
//               return logicObject[eleObject['onPress']]({
//                 index,
//                 itemData,
//                 listData,
//                 itemJson,
//                 setUi: onPressCallBack,
//                 getUi,
//                 ...propParameters,
//               });
//             }
//           } else {
//             let copy = new Function('return ' + eleObject['onPress'])();

//             return copy({
//               index,
//               itemData,
//               listData,
//               itemJson,
//               setUi: onPressCallBack,
//               getUi,
//               ...propParameters,
//             });
//           }
//         }
//       }
//     }
//   }
// };
// const onElementLongPress = (
//   eleObject,
//   index,
//   itemData,
//   listData,
//   logicObject,
//   propParameters,
//   itemJson,
//   onPressCallBack,
//   getUi,
// ) => {
//   if (logicObject == null) {
//     if (eleObject != null && eleObject['onLongClick'] != null) {
//       const isItFunction = isFunction(eleObject['onLongClick']);
//       if (typeof eleObject['onLongClick'] !== 'string' && isItFunction) {
//         return eleObject['onLongClick']({
//           index,
//           itemData,
//           listData,
//           itemJson,
//           setUi: onPressCallBack,
//           getUi,
//           ...propParameters,
//         });
//       } else {
//         if (
//           eleObject != null &&
//           eleObject['onLongClick'] != null &&
//           typeof eleObject['onLongClick'] === 'string'
//         ) {
//           let copy = new Function('return ' + eleObject['onLongClick'])();

//           return copy({
//             index,
//             itemData,
//             listData,
//             itemJson,
//             setUi: onPressCallBack,
//             getUi,
//             ...propParameters,
//           });
//         }
//       }
//     }
//   } else {
//     if (eleObject != null && eleObject['onLongClick'] != null) {
//       const isItFunction = isFunction(eleObject['onLongClick']);

//       if (isItFunction) {
//         return eleObject['onLongClick']({
//           index,
//           itemData,
//           listData,
//           itemJson,
//           setUi: onPressCallBack,
//           getUi,
//           ...propParameters,
//         });
//       } else {
//         if (typeof eleObject['onLongClick'] === 'string') {
//           if (logicObject[eleObject['onLongClick']] != null) {
//             if (typeof logicObject[eleObject['onLongClick']] === 'string') {
//               let copy = new Function(
//                 'return ' + logicObject[eleObject['onLongClick']],
//               )();

//               return copy({
//                 index,
//                 itemData,
//                 listData,
//                 itemJson,
//                 setUi: onPressCallBack,
//                 getUi,
//                 ...propParameters,
//               });
//             }
//             if (typeof logicObject[eleObject['onLongClick']] === 'object') {
//               return logicObject[eleObject['onLongClick']]({
//                 index,
//                 itemData,
//                 listData,
//                 itemJson,
//                 setUi: onPressCallBack,
//                 getUi,
//                 ...propParameters,
//               });
//             }
//           } else {
//             let copy = new Function('return ' + eleObject['onLongClick'])();

//             return copy({
//               index,
//               itemData,
//               listData,
//               itemJson,
//               setUi: onPressCallBack,
//               getUi,
//               ...propParameters,
//             });
//           }
//         }
//       }
//     }
//   }
// };

const GetRowElements = ({
  rowElementsArray,
  rowKey,
  navigation,
  onPressCallBack,
  onLongPressCallBack,
  logicObject,
  propParameters,
  route,
  customComponents,
  getUi,
}) => {
  const rowelements = [];
  if (
    rowElementsArray != null &&
    typeof rowElementsArray == 'object' &&
    rowElementsArray.length > 0
  ) {
    rowElementsArray.forEach((eleObject, index) => {
      // console.log('nammme', eleObject['name']);

      // if (eleObject != null && eleObject['name'] != null) {
      //   // console.log('inside');

      //   nameShortcutObject[eleObject['name']] = [rowKey, index];
      // }

      rowelements.push(
        <CheckForListviewAndRender
          key={index}
          index={index}
          elemOb={eleObject}
          navigation={navigation}
          route={route}
          propParameters={propParameters}
          customComponents={customComponents}
          // funProps={funProps}
          logicObject={logicObject}
          onPressCallBack={onPressCallBack}
          getUi={getUi}
          // onPress={({index, itemData, listData, itemJson}) => {
          //   onElementPress(
          //     eleObject,
          //     index,
          //     itemData,
          //     listData,
          //     logicObject,
          //     propParameters,
          //     itemJson,
          //     onPressCallBack,
          //     getUi,
          //   );
          // }}
          // onLongPress={(index, itemData, listData, itemJson) => {
          //   onElementLongPress(
          //     eleObject,
          //     index,
          //     itemData,
          //     listData,
          //     logicObject,
          //     propParameters,
          //     itemJson,
          //     onPressCallBack,
          //     getUi,
          //   );
          // }}
        />,
      );
    });
  }
  // console.log('rowshortcut ', nameShortcutObject);

  return rowelements;
};

const RenderColoumViews = ({
  totalData,
  navigation,
  logicObject,
  propParameters,
  onPressCallBack,
  onLongPressCallBack,
  route,
  customComponents,
  getUi,
}) => {
  // console.log('RenderColoumViews', customCompRef.current);

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
            <GetRowElements
              navigation={navigation}
              rowElementsArray={totalData[key]}
              rowKey={key}
              logicObject={logicObject}
              propParameters={propParameters}
              onPressCallBack={onPressCallBack}
              onLongPressCallBack={onLongPressCallBack}
              customComponents={customComponents}
              route={route}
              getUi={getUi}
            />
          </View>,
        );
      } else if (key != null && key.slice(0, 1) === 'v') {
        elements.push(
          <GetRowElements
            navigation={navigation}
            rowElementsArray={totalData[key]}
            rowKey={key}
            key={key + index + 1}
            logicObject={logicObject}
            propParameters={propParameters}
            onPressCallBack={onPressCallBack}
            onLongPressCallBack={onLongPressCallBack}
            customComponents={customComponents}
            route={route}
            getUi={getUi}
          />,
        );
      }
    });
  }

  return elements;
};
export default RenderColoumViews;
