import React from 'react';
import {View, Button, Image} from "react-native";

import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    useDerivedValue, withTiming, withRepeat, withDelay, withDecay
} from "react-native-reanimated";

type CloudsProps = {
    position: number
}

const Clouds = ({position}: CloudsProps) => {
    /* 구름
        구릅 크기 : 너비 15% ~ 40% , 높이 : 너비% x 2
        top 위치 범위 : 최소 5% ~ 최대 ( (100% - 높이%) - 최소값 ) ex) 60% : 5% ~ 35% , 40% : 5% ~ 55%
        top 중간 값 : (100% - 높이%) / 2
        left : 최소 10% ~ 최대 (100% - 너비%)
    * */

    const cloudsWidth = useSharedValue(10);
    const cloudOpacity = useSharedValue(Math.random() * 0.5 + 0.5);
    const theta = position >= 75 ? 15 : 25;
    const cloudsLeft = useSharedValue(position + (Math.random() * theta));
    const cloudsHeight = useDerivedValue(() => {
        return cloudsWidth.value * 2;
    });

    const cloudsTop = useSharedValue(10 + (Math.random() * (90 - cloudsHeight.value)));

    cloudsWidth.value = withRepeat(
                withTiming(10 + 100 * (Math.random() * 0.15)
                , {duration: 3000, easing: Easing.linear})
            , 0, true)

    const cloudStyle = useAnimatedStyle(() => {
        return {
            width: cloudsWidth.value + '%',
            height: cloudsHeight.value + '%',
        };
    })

    //console.log(position, cloudsLeft.value);

    return (
        <Animated.View style={[cloudStyle, {
            width: '20%', height: '40%', backgroundColor: '#FFFFFF', borderRadius: 80 * 0.5, position: 'absolute'
            , top: cloudsTop.value + '%'
            , left: cloudsLeft.value + '%'
            , opacity: cloudOpacity.value
        }]}/>
    )
};

export default Clouds;
