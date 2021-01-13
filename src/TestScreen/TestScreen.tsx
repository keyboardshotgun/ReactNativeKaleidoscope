// Kaleidoscope Box
import React, {useEffect} from 'react';
import {Button, View} from 'react-native';
import StyleGuide from '../components/StyleGuide';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    cancelAnimation, withSpring, withRepeat, useDerivedValue, useAnimatedReaction, runOnJS, withSequence, withDelay
} from "react-native-reanimated";

const TestScreen = () => {
    const rotate = useSharedValue(0);
    const scale  = useSharedValue(1);
    const squareS = Array.from({length:20}).map( () => useAnimatedStyle(() => {
            return {
                transform: [
                    { rotate : rotate.value + 'deg'},
                    { scale: scale.value }
                ]
            }
        }))

    const squareAnimationAction = () => {
        cancelAnimation(rotate)
        cancelAnimation(scale)
        rotate.value = 0;
        scale.value = 1;
        rotate.value = withRepeat( withTiming(-90,{
            duration: 5000,
            easing: Easing.elastic(0.7)
        }), 0,true);
    }

    useAnimatedReaction(() => {
        const tan = Math.tan(Math.abs(rotate.value) * Math.PI / 180);
        return (Math.sqrt(1 + tan * tan) / (1 + tan)) - 0.005 ;
    }, (result)=>{
        scale.value = result;
    },[rotate.value]);

    useEffect(()=>{
        return () => {
            cancelAnimation(rotate);
            cancelAnimation(scale);
        }
    },[])

    const pauseAnimation = () => {
        cancelAnimation(rotate);
        cancelAnimation(scale);
    }

    return (
        <View style={{ backgroundColor: '#000000' , flex : 1, justifyContent:'center', alignItems: 'center'}}>

            <Animated.View style={[StyleGuide.staticBox ,{ backgroundColor: '#ff0000'}]}>
                <Animated.View style={ [ squareS[0] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#ff0084' }] } >
                    <Animated.View style={ [ squareS[1] , StyleGuide.kBox  , { opacity : 0.8, backgroundColor: '#ff00d5' }] } >
                        <Animated.View style={ [ squareS[2] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#b300ff' } ] } >
                            <Animated.View style={ [ squareS[3] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#4c00ff' } ] } >
                                <Animated.View style={ [ squareS[4] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#0048ff' } ] } >
                                    <Animated.View style={ [ squareS[5] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#00a6ff' } ] } >
                                        <Animated.View style={ [ squareS[6] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#00ff88' } ] } >
                                            <Animated.View style={ [ squareS[7] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#a6ff00' } ] } >
                                                <Animated.View style={ [ squareS[8] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#ff9900' } ] } >
                                                   <Animated.View style={ [ squareS[9] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#1e7a4a' } ] } >
                                                   </Animated.View>
                                                </Animated.View>
                                            </Animated.View>
                                        </Animated.View>
                                    </Animated.View>
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>

            <Animated.View style={[StyleGuide.staticBox, { backgroundColor: '#00b7ff'}]}>
                <Animated.View style={ [ squareS[10] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#d900ff' } ] } >
                    <Animated.View style={ [ squareS[11] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#ff0066' } ] } >
                        <Animated.View style={ [ squareS[12] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#732d2d' } ] } >
                            <Animated.View style={ [ squareS[13] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#ff0000' } ] } >
                                <Animated.View style={ [ squareS[14] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#ffb700' } ] } >
                                    <Animated.View style={ [ squareS[15] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#e6ff00' } ] } >
                                        <Animated.View style={ [ squareS[16] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#00ff90' } ] } >
                                            <Animated.View style={ [ squareS[17] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#0088ff' } ] } >
                                                <Animated.View style={ [ squareS[18] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#5900ff' } ] } >
                                                    <Animated.View style={ [ squareS[19] , StyleGuide.kBox , { opacity : 0.8, backgroundColor: '#ff00bf' } ] } >
                                                        <Animated.View style={ [ squareS[20] , StyleGuide.kBox , { opacity : 1, backgroundColor: '#ff0000' } ] } />
                                                    </Animated.View>
                                                </Animated.View>
                                            </Animated.View>
                                        </Animated.View>
                                    </Animated.View>
                                </Animated.View>
                            </Animated.View>
                        </Animated.View>
                    </Animated.View>
                </Animated.View>
            </Animated.View>
            <View style={{position:'absolute',bottom : 25, left: StyleGuide.deviceWidth / 2 - 75}}>
                <Button style={{width:50}} title={'Start'} onPress={() => squareAnimationAction() } />
            </View>
            <View style={{position:'absolute',bottom : 25, left: StyleGuide.deviceWidth / 2 + 25}}>
                <Button style={{width:50}} title={'Stop'} onPress={() => pauseAnimation() } />
            </View>
        </View>
    )
}

export default TestScreen;
