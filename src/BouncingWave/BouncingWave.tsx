/*  Animated SharedValue to useState value
    const wrapper = (args) => {
        externalLibraryFunction(args)
    };
    useDerivedValue(() => {
       runOnJS(wrapper)(args); // this will work;
       // Code like this may not work => runOnJS(externalLibraryFunction)(args);
       // Hook's setState does not need wrapper function;
    });
*/

import React, {useEffect, useState} from 'react';
import {View, Button, Image} from "react-native";
const birdImage = require('../../assets/bird/pshBird.png');
const topPipe = require('../../assets/pipes/top_pipe_small.png');
const bottomPipe = require('../../assets/pipes/bottom_pipe_small.png');

import StyleGuide from "../components/StyleGuide";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    cancelAnimation, withSpring, withRepeat, useDerivedValue, useAnimatedReaction, runOnJS, withSequence, withDelay
} from "react-native-reanimated";
// import Clouds from "./Clouds";
import {useHeaderHeight} from '@react-navigation/stack';

const BouncingWave = () => {
    const ballDiameter = 60;
    const ballRadius = ballDiameter / 2;
    const boundX = StyleGuide.deviceWidth;
    const boundY = StyleGuide.deviceHeight;
    const headHeight = useHeaderHeight();
    const [toggle, setToggle] = useState(false);
    const [btnLock,setBtnLock] = useState(false);
    const offsetX = useSharedValue(boundX / 2 - ballRadius);
    const offsetY = useSharedValue(boundY / 2 - ballRadius);
    const pipeX = useSharedValue(StyleGuide.deviceWidth);
    const randomWidth = useSharedValue(100);
    const randomHeightTop = useSharedValue(StyleGuide.deviceHeight * 0.35);
    const randomHeightBottom = useSharedValue(StyleGuide.deviceHeight * 0.35);
    const headAngle = useSharedValue(0);
    const birdLife = useSharedValue(3);
    const [sBirdLife, setSBirdLife] = useState(birdLife.value);
    const [points, setPoints] = useState(0);
    const [stopTest, setStopTest] = useState(false);

    const BouncingAnimation = () => {
        'worklet';
        if (headAngle.value < 45) {
            headAngle.value = withTiming(40, {
                duration: 1000,
                easing: Easing.bounce
            });
        }
        offsetY.value = withTiming(boundY, {
            duration: 3000,
            easing: Easing.linear
        });
    }

    const flyAnimation = () => {
        'worklet';
        headAngle.value = withTiming(-40, {
            duration: 50,
            easing: Easing.elastic(0.5)
        }, () => {
        });
        offsetY.value = withTiming(offsetY.value - 20, {
            duration: 50,
            easing: Easing.bounce
        }, () => {
            BouncingAnimation();
        });
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offsetX.value},
                {translateY: offsetY.value},
                {rotateZ: ((offsetY.value / boundY) * 100) > 75 ? (headAngle.value + 25) + 'deg' : (headAngle.value) + 'deg'},
            ],
        };
    });

    useAnimatedReaction(() => {
        return offsetY.value;
    }, (result) => {
        if (result <= 5) { // Top action
            headAngle.value = withTiming(540, {
                duration: 1500,
                easing: Easing.elastic(0.5)
            }, () => {
            });
            offsetY.value = withTiming(offsetY.value + 150,
                {
                    duration: 500,
                    easing: Easing.elastic(2)
                }, () => {
                    BouncingAnimation();
                });
        } else if (result >= boundY) { // Bottom action
            birdLife.value = birdLife.value > 0 ? birdLife.value - 1 : 0;
            cancelAnimation(offsetX);
            cancelAnimation(offsetY);
            cancelAnimation(pipeX);
            cancelAnimation(headAngle);
            randomWidth.value = withTiming(100);
            headAngle.value = withSpring(0);
            offsetY.value = withSpring(boundY / 2 - ballDiameter);
            if(birdLife.value >= 0){
                pipeX.value = withSpring(StyleGuide.deviceWidth);
            }else if(birdLife.value === 0){
                pipeX.value = withTiming(StyleGuide.deviceWidth, {
                    duration : 0
                });
            }
        }
    }, [offsetY.value]);

    // 상단 파이프 동작
    const pipeMover = () => {
        'worklet';
        cancelAnimation(pipeX);
        cancelAnimation(pipeXDerived);
        pipeX.value = StyleGuide.deviceWidth;
        pipeX.value = withRepeat( withTiming(-(randomWidth.value + 20),
            {
                duration: 5000,
                easing: Easing.linear
            }, () => {

            })
        ,0,false); // reps = 0 == infinite
    }

    // 상단 파이프 동작 스타일
    const pipeMovingStyles = useAnimatedStyle(() => {
        'worklet';
        return {
            width: randomWidth.value,
            height: randomHeightTop.value,
            transform: [
                {translateX: pipeX.value},
                {translateY: 0},
            ],
        };
    }, [pipeX.value]);

    // 하단 파이프 동작
    const pipeXDerived = useDerivedValue(() => {
        return pipeX.value;
    }, [pipeX.value]);

    // 하단 파이프 동작 스타일
    const pipeMovingDerivedStyles = useAnimatedStyle(() => {
        return {
            width: randomWidth.value,
            height: randomHeightBottom.value,
            transform: [
                {translateX: pipeXDerived.value},
                {translateY: ballDiameter*2}
            ],
        };
    });

    /*
     * Animated-sharedValue to stateValue function using useDerivedValue Hook
     */

    const updatePoints = (types: string) => {
        if(types === 'reset'){
            setPoints(0);
        }else if(types === 'plus'){
            setPoints(points+randomWidth.value);
        }
    }

    // 점수 및 파이프 세팅 업데이트, 새 충돌 처리
    useAnimatedReaction(() => { // Points update, (Added points is pipe width);
        return pipeX.value;
    },(result)=>{
        /*
        *  pipeX.value ~ pipeX.value + randomWidth.value : 파이프의 넓이 범위
        *  offsetX.value ~ offsetX.value + ballDiameter  : 새의 넓이 범위
        * */
        const pipeWidthStart = result - 50;
        const pipeWidthEnd = result + (randomWidth.value) - 50;
        const birdWidthStart = offsetX.value - 30;
        const birdWidthEnd = offsetX.value;

      if ( pipeWidthStart <= birdWidthEnd && pipeWidthEnd >= birdWidthStart ){
          if ( (offsetY.value) <= randomHeightTop.value - 10 || (randomHeightTop.value + ballDiameter * 2) <= offsetY.value + (ballDiameter - 20) ){
              console.log('Impact !!!!');
              if(stopTest === false){
                  runOnJS(setStopTest)(true);
                  runOnJS(setBtnLock)(true);
              }
          }
      }else{
          const percents = (( (result + randomWidth.value) / (boundX + randomWidth.value) ) * 100 );
          if (percents < 0 && percents > -0.5){
              runOnJS(updatePoints)('plus');
          }else if( percents >= 99.5 && percents <= 100 ) {
              randomWidth.value = Math.round((Math.random() * 40) + 80);
              randomHeightTop.value = StyleGuide.deviceHeight * (0.1 + (Math.random() * 0.5));
              randomHeightBottom.value = StyleGuide.deviceHeight - randomHeightTop.value - 50;
          }
      }
    }, [pipeX.value]);

    useEffect(() => {
        if(stopTest === true){
            stopPipeMover();
        }
        return () => {
            setStopTest(false);
        }
    },[stopTest]);

    useAnimatedReaction(() => { // EyeBird Life update
            return birdLife.value;
        },(result)=>{
            runOnJS(setSBirdLife)(result);
        }
        , [birdLife.value]);

    // stop all animations;
    const stopPipeMover = () => {
        'worklet';
        cancelAnimation(offsetY);
        cancelAnimation(headAngle);
        cancelAnimation(pipeX);
        cancelAnimation(pipeXDerived);
        pipeX.value = pipeX.value + 100;
        pipeX.value = withTiming(StyleGuide.deviceWidth);
        headAngle.value = withTiming(-540);
        offsetY.value = withSequence(
            withTiming(offsetY.value - 100),
            withTiming(boundY),
        )
    }

    const startAnimation = () => {
        'worklet';
        if (btnLock === true){
            setBtnLock(false);
        }
        if (stopTest === true){
            setStopTest(false);
        }
        cancelAnimation(headAngle);
        cancelAnimation(pipeX);
        cancelAnimation(pipeXDerived);
        cancelAnimation(offsetY);
        if(birdLife.value === 0){
            runOnJS(updatePoints)('reset');
            birdLife.value = 3;
        }else if(birdLife.value === 3){
            runOnJS(updatePoints)('reset');
        };
        offsetY.value = boundY / 2 - ballDiameter;
        pipeMover();
        flyAnimation();
    }

    return (
        <View style={StyleGuide.mainScreenSky}>

            <Animated.View style={[pipeMovingStyles, {
                width: 50,
                height: StyleGuide.deviceHeight * 0.35,
                backgroundColor: '#23b71b'
            }]}>
                <Image
                    source={bottomPipe}
                    resizeMode={"cover"}
                    style={{width: '100%', height: '100%'}}
                />
            </Animated.View>

            <Animated.View style={[pipeMovingDerivedStyles, {
                width: 50,
                height: StyleGuide.deviceHeight * 0.35 + ballDiameter,
                backgroundColor: '#23b71b'
            }]}>
                <Image
                    source={topPipe}
                    resizeMode={"cover"}
                    style={{width: '100%', height: '100%'}}
                />
            </Animated.View>

            <View style={{position: 'absolute', top: 10, right: 30}}>
                <Animated.Text>{`Left : ${sBirdLife}`}</Animated.Text>
            </View>

            <View style={{position: 'absolute', top: 10, left: 30}}>
                <Animated.Text>{`Points : ${points}`}</Animated.Text>
            </View>

            <Animated.View
                style={[animatedStyles, {
                    width: 50,
                    height: 50,
                    borderRadius: 50 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                }]}>
                <Image
                    source={birdImage}
                    resizeMode={"center"}
                    style={{width: 60, height: 60}}
                />
            </Animated.View>

            <View style={{width: 60, position: 'absolute', bottom: 10, left: StyleGuide.deviceWidth / 2 - 120}}>
                <Button title={'start'} onPress={() => startAnimation()}/>
            </View>
            <View style={{width: 60, position: 'absolute', bottom: 10, left: StyleGuide.deviceWidth / 2 - 30}}>
                <Button disabled={btnLock} title={'fly'} onPress={() => flyAnimation()}/>
            </View>
            <View style={{width: 60, position: 'absolute', bottom: 10, left: StyleGuide.deviceWidth / 2 + 60}}>
                <Button title={'stop'} onPress={ () => {} }/>
            </View>
        </View>
    )
}

export default BouncingWave;
