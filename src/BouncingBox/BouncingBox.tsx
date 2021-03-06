import React, {useEffect} from 'react';
import Svg, {Defs, LinearGradient, Path, Rect, Stop, Text} from 'react-native-svg';
import {Button, View} from "react-native";
import {StyleGuide} from "../components";
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedProps, useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";
import {mix} from 'react-native-redash';
import {TextInput} from "react-native-gesture-handler";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedPath = Animated.createAnimatedComponent(Path);
const BouncingBox = () => {

    const progress = useSharedValue(0);
    const risingSun = useSharedValue(0);
    const countDownText = useSharedValue(0);

    useEffect(() => {
        return () => {
            cancelAnimation(progress)
            cancelAnimation(risingSun)
            cancelAnimation(countDownText)
        }
    }, [progress, risingSun]);

    const startWave = () => {
        cancelAnimation(progress);
        cancelAnimation(risingSun);
        cancelAnimation(countDownText);

        progress.value = withRepeat(
            withTiming(1, {duration: 5000, easing: Easing.inOut(Easing.ease)}),
            0,
            true)

        risingSun.value = withRepeat(
            withTiming(1, {duration: 15000, easing: Easing.linear}),
            1,
            false)

        countDownText.value = withTiming(1, {duration: 5000, easing: Easing.linear});
    }

    const stopWave = () => {
        cancelAnimation(progress);
        cancelAnimation(risingSun);
        cancelAnimation(countDownText);
        progress.value = 0;
        risingSun.value = 0;
        countDownText.value = 0;
    }

    const firstWave = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, progress.value);
        // m(시작값 , 종료값)
        return {x: m(-30, 130), y: m(120, 90), z: m(125, 135)};
    }, [progress])

    const path1 = useAnimatedProps(() => {
        'worklet';
        const {x, y, z} = firstWave.value;
        return {d: `M -30 ${z} Q ${x} ${y} 130 ${z}`};
    });

    // ==========================================================

    const secondWave = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, progress.value);
        return {x: m(90, -10), y: m(120, 100)};
    }, [progress])

    const path2 = useAnimatedProps(() => {
        'worklet';
        const {x, y} = secondWave.value;
        return {d: `M -25 115 Q ${x} ${y} 125 115`};
    });

    // ==========================================================

    const thirdWave = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, progress.value);
        return {x: m(-30, 120), y: m(110, 95)};
    }, [progress])

    const path3 = useAnimatedProps(() => {
        'worklet';
        const {x, y} = thirdWave.value;
        return {d: `M -20 110 Q ${x} ${y} 120 110`};
    });


    // ==========================================================
    const fourthWave = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, progress.value);
        return {x: m(110, -10), y: m(90, 70)};
    }, [progress])

    const path4 = useAnimatedProps(() => {
        'worklet';
        const {x, y} = fourthWave.value;
        return {d: `M -15 105 Q ${x} ${y} 115 105`};
    });

    // ==========================================================
    const fifthWave = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, progress.value);
        return {x: m(-50, 150), y: m(90, 70)};
    }, [progress])

    const path5 = useAnimatedProps(() => {
        'worklet';
        const {x, y} = fifthWave.value;
        return {d: `M -20 90 Q ${x} ${y} 130 90`};
    });

    // ==========================================================
    const sixthWave = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, progress.value);
        return {x: m(-40, 140), y: m(70, 88)};
    }, [progress])

    const path6 = useAnimatedProps(() => {
        'worklet';
        const {x, y} = sixthWave.value;
        return {d: `M -20 88 Q ${x} ${y} 130 88`};
    });

    // ==========================================================
    const seventhWave = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, progress.value);
        return {x: m(-10, 120), y: m(80, 80)};
    }, [progress])

    const path7 = useAnimatedProps(() => {
        'worklet';
        const {x, y} = seventhWave.value;
        return {d: `M 0 78 Q ${x} ${y} 100 78`};
    });

    //============================================ sun

    const sun = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, risingSun.value);
        return {x: m(580, 450), cxy: m(25, 40)};
    })

    const sunPath = useAnimatedProps(() => {
        'worklet';
        const {x, cxy} = sun.value;
        return {
            d: `M 200 ${x} 
        a ${cxy} ${cxy} 0 1 1 1,0`
        };
    });

    const sunPath2 = useAnimatedProps(() => {
        'worklet';
        return {d: `M 200 546 a 35 35 0 1 1 1,0`};
    });

    const sunShadow = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, risingSun.value);
        return {x: m(0, 0), rx: m(30, 40), ry: m(-10, 30)};
    })

    const sunBottomPath = useAnimatedProps(() => {
        'worklet';
        const {x, rx, ry} = sunShadow.value;
        return {d: `M 225 ${x} a ${rx} ${ry} 0 1 1 -50,0`};
    });

    const sunShadowOpacity = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, risingSun.value);
        return {o: m(0, 0.3)};
    })

    const sunConnectOpacity = useAnimatedStyle(() => {
        return {
            opacity: risingSun.value >= 0.77 && risingSun.value <= 0.785 ? 1 : 0
        };
    });

    const sunBottomOpacity = useAnimatedStyle(() => {
        return {
            opacity: risingSun.value >= 0.25 ? sunShadowOpacity.value.o : 0
        };
    });

    const textAnimation = useDerivedValue(() => {
        'worklet';
        const m = mix.bind(null, countDownText.value);
        return {t: m(10, 0), s: m(70, 0), left: m(150, 200) , top: m(300, StyleGuide.deviceHeight*0.61) };
    })

    const animatedTextProps = useAnimatedProps(() => {
        const timerText = textAnimation.value.t <= 0 ? '' : `${textAnimation.value.t.toFixed(1)}`;
        const fontSize = textAnimation.value.t >= 9.9 ? 0 : textAnimation.value.s;
        return {
            text: timerText,
            fontSize: fontSize,
            left : textAnimation.value.left,
            top : textAnimation.value.top,
        }
    })

    return (
        <>
            <View style={StyleGuide.mainOcean}>
                <Svg height={StyleGuide.deviceHeight * 0.65}
                     width={StyleGuide.deviceWidth}
                     style={{position: 'absolute', left: 0, top: 0}}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor="#9B1C1C" stopOpacity="1"/>
                            <Stop offset="0.1" stopColor="#da4531" stopOpacity="1"/>
                            <Stop offset="0.98" stopColor="#FFD080" stopOpacity="1"/>
                            <Stop offset="1" stopColor="#DA7A66" stopOpacity="1"/>
                        </LinearGradient>
                    </Defs>
                    <Rect x="0" y="0"
                          width={StyleGuide.deviceWidth}
                          height={StyleGuide.deviceHeight * 0.65}
                          fill="url(#grad)"/>

                    <Text
                        fill="none"
                        stroke="#FFD080"
                        strokeWidth={0.3}
                        fontSize="15"
                        fontWeight="bolder"
                        x="200"
                        y="45"
                        textAnchor="middle"
                    >
                        SVG SUN RISING
                    </Text>

                    <AnimatedPath
                        style={sunConnectOpacity}
                        animatedProps={sunPath2}
                        strokeWidth={0.1} stroke="transparent" fill='#FAF8FA'
                    />

                    <AnimatedPath
                        animatedProps={sunPath}
                        strokeWidth={0.5}
                        stroke="transparent"
                        fill='#FAF8FA' opacity={1}
                    />
                </Svg>

                <AnimatedTextInput
                    style={{
                         position:'absolute'
                        ,fontSize: 70
                    }}
                    underlineColorAndroid="transparent"
                    editable={false}
                    value={''}
                    animatedProps={animatedTextProps}
                />

                <Svg height={StyleGuide.deviceHeight * 0.35}
                     width={StyleGuide.deviceWidth}
                     style={{position: 'absolute', left: 0, top: StyleGuide.deviceHeight * 0.65}}>
                    <Defs>
                        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor="#FFFFFF" stopOpacity="1"/>
                            <Stop offset="0.009" stopColor="#b2d0c6" stopOpacity="1"/>
                            <Stop offset="0.5" stopColor="#1b5f5e" stopOpacity="1"/>
                            <Stop offset="1" stopColor="#1B4B4A" stopOpacity="1"/>
                            {/*#1b5f5e*/}
                        </LinearGradient>
                    </Defs>

                    <Rect x="0" y="0"
                          width={StyleGuide.deviceWidth}
                          height={StyleGuide.deviceHeight * 0.35}
                          fill="url(#grad)">
                    </Rect>

                    <AnimatedPath
                        style={sunBottomOpacity}
                        animatedProps={sunBottomPath}
                        strokeWidth={0.1} stroke="transparent" fill='#FA5C49'
                    />
                </Svg>

                <Svg
                    height={StyleGuide.deviceHeight}
                    width={StyleGuide.deviceWidth}
                    viewBox={'0 0 100 100'}
                    style={{
                        position: 'absolute', left: 0, top: 0
                        , backgroundColor: 'transparent'
                    }}
                >
                    <AnimatedPath animatedProps={path7} strokeWidth={0.1} stroke="transparent" fill='#B96E6E'/>
                    <AnimatedPath animatedProps={path6} strokeWidth={0.1} stroke="#FFFFFF"/>
                    <AnimatedPath animatedProps={path5} strokeWidth={0.1} stroke="#FFFFFF"/>
                    <AnimatedPath animatedProps={path4} strokeWidth={0.1} stroke="#FFFFFF"/>
                    <AnimatedPath animatedProps={path3} strokeWidth={0.1} stroke="#FFFFFF"/>
                    <AnimatedPath animatedProps={path2} strokeWidth={0.1} stroke="#FFFFFF"/>
                    <AnimatedPath animatedProps={path1} strokeWidth={0.1} stroke="#FFFFFF" fill="#1B4B4A"/>
                </Svg>

                <View style={{
                    position: 'absolute', left: 0, top: 20
                    , flexDirection: 'row'
                    , justifyContent: 'space-around'
                    , alignItems: 'center'
                    , width: StyleGuide.deviceWidth
                    , height: 40
                }}>
                    <Button title={'start'} onPress={() => startWave()} color={'#da4531'}/>
                    <Button title={'stop'} onPress={() => stopWave()} color={'#da4531'}/>
                </View>
            </View>
        </>
    )
}

export default BouncingBox;
