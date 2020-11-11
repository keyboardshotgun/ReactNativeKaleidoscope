import React, {Component, useState} from 'react';
import {View, Text, Button} from "react-native";
import StyleGuide from "../components/StyleGuide";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    cancelAnimation, withSpring, withRepeat
} from "react-native-reanimated";
import {useHeaderHeight} from '@react-navigation/stack';

const BouncingWave = () => {
    const ballDiameter = 60;
    const ballRadius = ballDiameter / 2;
    const boundX = StyleGuide.deviceWidth;
    const boundY = StyleGuide.deviceHeight;
    const headHeight = useHeaderHeight()
    const [toggle,setToggle] = useState(false);
    const offsetX = useSharedValue(boundX/2-ballRadius)
    const offsetY = useSharedValue(boundY/2-ballDiameter)

    const BouncingAnimation = () => {
        'worklet';
        cancelAnimation(offsetX);
        cancelAnimation(offsetY);
        offsetX.value = withTiming( Math.round(Math.random() * (StyleGuide.deviceWidth - ballDiameter)) ,{},()=> {
            BouncingAnimation();
        });
        offsetY.value = withTiming( Math.round(Math.random() * (StyleGuide.deviceHeight - ballDiameter)));
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: offsetX.value},
                {translateY: offsetY.value}
            ],
        };
    });

    return (
        <View style={StyleGuide.mainScreen}>
            <Animated.View style={[animatedStyles, {
                width: 60,
                height: 60,
                borderRadius: 30,
                borderColor: '#FFFFFF',
                borderWidth: 1,
                backgroundColor: '#AAAAAA'
            }]}/>
            <View style={{width: 60, position: 'absolute', bottom: 10, left: StyleGuide.deviceWidth / 2 - 30}}>
                <Button title={'push'} onPress={() => BouncingAnimation()}/>
            </View>
        </View>
    )
}

export default BouncingWave;
