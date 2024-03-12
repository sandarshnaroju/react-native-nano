import React, {useEffect, useRef} from 'react';
import {EventRegister} from 'react-native-event-listeners';
import {
  runOnJS,
  useSharedValue,
  withClamp,
  withDecay,
  withRepeat,
  withSpring,
  withTiming,
  withDelay,
  useAnimatedProps,
  interpolate,
} from 'react-native-reanimated';
export const animateUi = (objName, r) => {
  EventRegister.emit('animation' + objName, JSON.stringify(r));
};
export const useReanimationHook = ({elementProps}) => {
  let animVal = null;

  let animatedStylesRef = useRef({});
  let animatedPropsRef = useRef({});

  if (
    elementProps != null &&
    elementProps['animation'] != null &&
    elementProps['animation']['advanced'] != null
  ) {
    elementProps['animation']['advanced'].forEach(
      (singleTypeAnimationObject, index) => {
        if (
          singleTypeAnimationObject != null &&
          singleTypeAnimationObject.runIn != null &&
          (singleTypeAnimationObject.runIn == 'parallel' ||
            singleTypeAnimationObject.runIn == 'series') &&
          singleTypeAnimationObject.run != null &&
          singleTypeAnimationObject.run.length > 0
        ) {
          singleTypeAnimationObject.run.forEach(singleAnimationObject => {
            if (singleAnimationObject['componentProps'] != null) {
              Object.keys(singleAnimationObject['componentProps']).forEach(
                propsKey => {
                  if (
                    propsKey === 'style' &&
                    singleAnimationObject['componentProps']['style'] != null
                  ) {
                    if (animVal == null) {
                      Object.keys(
                        singleAnimationObject['componentProps']['style'],
                      ).forEach((animKey, i) => {
                        animatedStylesRef.current[animKey] = useSharedValue(
                          elementProps['props']['style'][animKey],
                        );
                      });
                    }
                  } else {
                    // useAnimatedProps
                    animatedPropsRef.current = useAnimatedProps(() => {
                      return {
                        style: {},
                        ...elementProps['props'],
                      };
                    });
                  }
                },
              );
            }
          });
        }
      },
    );
  }

  const runSingleStyleKeyValueAnimation = ({
    singleAnimationObject,
    styleKeyTobeAnimated,
    index,
    onAnimationFinish,
  }) => {
    switch (singleAnimationObject['type']) {
      case 'timing':
        animatedStylesRef.current[styleKeyTobeAnimated].value = withDelay(
          singleAnimationObject['delay'] != null &&
            typeof singleAnimationObject['delay'] == 'number'
            ? singleAnimationObject['delay']
            : 0,
          withRepeat(
            singleAnimationObject['clamp'] != null
              ? withClamp(
                  singleAnimationObject['clamp'],
                  withTiming(
                    singleAnimationObject['componentProps']['style'][
                      styleKeyTobeAnimated
                    ],
                    singleAnimationObject['config'],
                    () => {
                      // if (onAnimationFinish) {
                      //   runOnJS(onAnimationFinish)(index);
                      // }
                    },
                  ),
                )
              : withTiming(
                  singleAnimationObject['componentProps']['style'][
                    styleKeyTobeAnimated
                  ],
                  singleAnimationObject['config'],
                  () => {
                    // if (onAnimationFinish) {
                    //   runOnJS(onAnimationFinish)(index);
                    // }
                  },
                ),
            singleAnimationObject['repeat'] != null &&
              singleAnimationObject['repeat']['numberOfReps'] != null
              ? singleAnimationObject['repeat']['numberOfReps']
              : 1,
            singleAnimationObject['repeat'] != null &&
              singleAnimationObject['repeat']['reverse'] != null
              ? singleAnimationObject['repeat']['reverse']
              : false,
            () => {
              if (onAnimationFinish) {
                runOnJS(onAnimationFinish)(index);
              }
            },
          ),
        );
        break;
      case 'spring':
        animatedStylesRef.current[styleKeyTobeAnimated].value = withDelay(
          singleAnimationObject['delay'] != null &&
            typeof singleAnimationObject['delay'] == 'number'
            ? singleAnimationObject['delay']
            : 0,
          withRepeat(
            singleAnimationObject['clamp'] != null
              ? withClamp(
                  singleAnimationObject['clamp'],
                  withSpring(
                    singleAnimationObject['componentProps']['style'][
                      styleKeyTobeAnimated
                    ],
                    singleAnimationObject['config'],
                    () => {
                      if (onAnimationFinish) {
                        runOnJS(onAnimationFinish)(index);
                      }
                    },
                  ),
                )
              : withSpring(
                  singleAnimationObject['componentProps']['style'][
                    styleKeyTobeAnimated
                  ],
                  singleAnimationObject['config'],
                  () => {
                    if (onAnimationFinish) {
                      runOnJS(onAnimationFinish)(index);
                    }
                  },
                ),

            singleAnimationObject['repeat'] != null &&
              singleAnimationObject['repeat']['numberOfReps'] != null
              ? singleAnimationObject['repeat']['numberOfReps']
              : 1,
            singleAnimationObject['repeat'] != null &&
              singleAnimationObject['repeat']['reverse'] != null
              ? singleAnimationObject['repeat']['reverse']
              : false,
            () => {
              if (onAnimationFinish) {
                runOnJS(onAnimationFinish)(index);
              }
            },
          ),
        );
        break;
      case 'decay':
        animatedStylesRef.current[styleKeyTobeAnimated].value = withDelay(
          singleAnimationObject['delay'] != null &&
            typeof singleAnimationObject['delay'] == 'number'
            ? singleAnimationObject['delay']
            : 0,
          withRepeat(
            singleAnimationObject['clamp'] != null
              ? withClamp(
                  singleAnimationObject['clamp'],
                  withDecay(singleAnimationObject['config'], () => {
                    if (onAnimationFinish) {
                      runOnJS(onAnimationFinish)(index);
                    }
                  }),
                )
              : withDecay(singleAnimationObject['config'], () => {
                  if (onAnimationFinish) {
                    runOnJS(onAnimationFinish)(index);
                  }
                }),
            singleAnimationObject['repeat'] != null &&
              singleAnimationObject['repeat']['numberOfReps'] != null
              ? singleAnimationObject['repeat']['numberOfReps']
              : 1,
            singleAnimationObject['repeat'] != null &&
              singleAnimationObject['repeat']['reverse'] != null
              ? singleAnimationObject['repeat']['reverse']
              : false,
            () => {
              if (onAnimationFinish) {
                runOnJS(onAnimationFinish)(index);
              }
            },
          ),
        );
        break;
      case 'continuous':
        if (
          singleAnimationObject != null &&
          singleAnimationObject['animType'] != null &&
          singleAnimationObject['animType']['type'] != null
        ) {
          switch (singleAnimationObject['animType']['type']) {
            case 'clamp':
              if (
                styleKeyTobeAnimated == 'transform' &&
                singleAnimationObject['componentProps']['style'][
                  styleKeyTobeAnimated
                ] != null &&
                typeof singleAnimationObject['componentProps']['style'][
                  styleKeyTobeAnimated
                ] == 'object' &&
                singleAnimationObject['componentProps']['style'][
                  styleKeyTobeAnimated
                ].length > 0
              ) {
                singleAnimationObject['componentProps']['style'][
                  styleKeyTobeAnimated
                ].forEach((transformObj, ind) => {
                  Object.keys(transformObj).forEach(transformObjKey => {
                    const tempObj = {};
                    tempObj[transformObjKey] = interpolate(
                      singleAnimationObject['componentProps']['style'][
                        styleKeyTobeAnimated
                      ][ind][transformObjKey],
                      singleAnimationObject['animType']['input'],
                      singleAnimationObject['animType']['output'],
                      singleAnimationObject['animType']['type'],
                    );

                    animatedStylesRef.current[styleKeyTobeAnimated].value = [
                      tempObj,
                    ];
                  });
                });
              } else {
                animatedStylesRef.current[styleKeyTobeAnimated].value =
                  interpolate(
                    singleAnimationObject['componentProps']['style'][
                      styleKeyTobeAnimated
                    ],
                    singleAnimationObject['animType']['input'],
                    singleAnimationObject['animType']['output'],
                    singleAnimationObject['animType']['type'],
                  );
              }

              onAnimationFinish();

              break;

            default:
              animatedStylesRef.current[styleKeyTobeAnimated].value =
                singleAnimationObject['componentProps']['style'][
                  styleKeyTobeAnimated
                ];
              break;
          }
        } else {
          animatedStylesRef.current[styleKeyTobeAnimated].value =
            singleAnimationObject['componentProps']['style'][
              styleKeyTobeAnimated
            ];
        }

        break;

      default:
        break;
    }
  };

  const runSingleAnimationObject = ({
    animationObjectCount,
    singleTypeAnimationObject,
  }) => {
    if (
      singleTypeAnimationObject != null &&
      singleTypeAnimationObject.run != null &&
      animationObjectCount != null &&
      typeof animationObjectCount == 'number'
    ) {
      const singleAnimationObject =
        singleTypeAnimationObject.run[animationObjectCount];

      if (
        singleAnimationObject != null &&
        singleAnimationObject['componentProps'] != null
      ) {
        const keysArray = Object.keys(
          singleAnimationObject['componentProps']['style'],
        );
        let finished = 0;
        const onAnimationFinish = index => {
          finished++;

          if (finished == keysArray.length) {
            if (
              animationObjectCount <
              singleTypeAnimationObject.run.length - 1
            ) {
              animationObjectCount++;

              runSingleAnimationObject({
                animationObjectCount,
                singleTypeAnimationObject,
              });
            } else {
            }
          }
        };
        keysArray.forEach((styleKeyTobeAnimated, ind) => {
          runSingleStyleKeyValueAnimation({
            styleKeyTobeAnimated,
            singleAnimationObject,
            index: ind,
            onAnimationFinish,
          });
        });
      }
    }
  };

  const startAnimation = element => {
    if (
      element != null &&
      element['animation'] != null &&
      element['animation']['advanced'] != null &&
      element['animation']['advanced'].length > 0
    ) {
      for (let i = 0; i < element['animation']['advanced'].length; i++) {
        const singleTypeAnimationObject = element['animation']['advanced'][i];
        if (
          singleTypeAnimationObject != null &&
          singleTypeAnimationObject.runIn != null &&
          singleTypeAnimationObject.run != null &&
          singleTypeAnimationObject.run.length > 0
        ) {
          if (singleTypeAnimationObject.runIn == 'series') {
            let animationObjectCount = 0;
            runSingleAnimationObject({
              animationObjectCount,
              singleTypeAnimationObject,
            });
          }
          if (singleTypeAnimationObject.runIn == 'parallel') {
            singleTypeAnimationObject.run.forEach(singleAnimationObject => {
              const keysArray = Object.keys(
                singleAnimationObject['componentProps']['style'],
              );
              keysArray.forEach(styleKeyTobeAnimated => {
                runSingleStyleKeyValueAnimation({
                  styleKeyTobeAnimated,
                  singleAnimationObject,
                });
              });
            });
          }
        }
      }
    }
  };
  startAnimation(elementProps);
  useEffect(() => {
    EventRegister.addEventListener('animation' + elementProps['name'], v => {
      startAnimation(JSON.parse(v));
    });
  }, []);

  return [animatedStylesRef, animatedPropsRef];
};
