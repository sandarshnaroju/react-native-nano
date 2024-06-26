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
  ExtrapolationType,
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
                          singleAnimationObject['componentProps']['style'][
                            animKey
                          ],
                        );
                      });
                    }
                  } else {
                    // useAnimatedProps
                    if (elementProps != null && elementProps['props'] != null) {
                      animatedPropsRef.current = useAnimatedProps(() => {
                        return {
                          style: {},
                          ...elementProps['props'],
                        };
                      });
                    }
                  }
                },
              );
            }
          });
        }
      },
    );
  }

  interface SingleAnimationObject {
    type: string;
    delay?: number;
    clamp?: any;
    componentProps: {
      style: {
        [key: string]: any;
      };
    };
    config?: {
      [key: string]: any;
    };
    repeat?: {
      numberOfReps?: number;
      reverse?: boolean;
    };
    animationProps?: {
      type: ExtrapolationType;
      input: number[];
      output: number[];
    };
  }

  interface AnimatedStylesRef {
    current: {
      [key: string]: any;
    };
  }

  interface OnAnimationFinish {
    (any): void;
  }
  const runSingleStyleKeyValueAnimation = ({
    singleAnimationObject,
    styleKeyTobeAnimated,
    index,
    onAnimationFinish,
  }: {
    singleAnimationObject: SingleAnimationObject;
    styleKeyTobeAnimated: string;
    index: number;
    onAnimationFinish: OnAnimationFinish;
  }): void => {
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
          singleAnimationObject['animationProps'] != null &&
          singleAnimationObject['animationProps']['type'] != null
        ) {
          switch (singleAnimationObject['animationProps']['type']) {
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
                let modifiedTransformArray = [];
                singleAnimationObject['componentProps']['style'][
                  styleKeyTobeAnimated
                ].forEach((transformObj, ind) => {
                  const tempObj = {};

                  Object.keys(transformObj).forEach(transformObjKey => {
                    tempObj[transformObjKey] = interpolate(
                      singleAnimationObject['componentProps']['style'][
                        styleKeyTobeAnimated
                      ][ind][transformObjKey],
                      singleAnimationObject['animationProps']['input'],
                      singleAnimationObject['animationProps']['output'],
                      singleAnimationObject['animationProps']['type'],
                    );
                  });
                  modifiedTransformArray.push(tempObj);
                });
                animatedStylesRef.current[styleKeyTobeAnimated].value =
                  modifiedTransformArray;
              } else {
                animatedStylesRef.current[styleKeyTobeAnimated].value =
                  interpolate(
                    singleAnimationObject['componentProps']['style'][
                      styleKeyTobeAnimated
                    ],
                    singleAnimationObject['animationProps']['input'],
                    singleAnimationObject['animationProps']['output'],
                    singleAnimationObject['animationProps']['type'],
                  );
              }

              onAnimationFinish(index);

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

  interface SingleTypeAnimationObject {
    runIn: 'series' | 'parallel';
    run: SingleAnimationObject[];
  }

  interface OnAnimationFinish {
    (index: number): void;
  }
  const runSingleAnimationObject = ({
    animationObjectCount,
    singleTypeAnimationObject,
  }: {
    animationObjectCount: number;
    singleTypeAnimationObject: SingleTypeAnimationObject;
  }): void => {
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

  interface Element {
    animation?: {
      advanced?: {
        runIn: 'series' | 'parallel';
        run: SingleAnimationObject[];
      }[];
    };
  }

  const startAnimation = (element: Element) => {
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
                  index: 0,
                  onAnimationFinish: () => {},
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
