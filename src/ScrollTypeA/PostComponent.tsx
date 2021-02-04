import React from 'react';
import {StyleSheet, View, Text, Animated as RAnimated} from "react-native";
import {StyleGuide} from "../components";
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle
} from "react-native-reanimated";
import {TapGestureHandler, TapGestureHandlerGestureEvent} from "react-native-gesture-handler";

interface PostProps {
    color : {
        start: string;
        end: string;
    },
    index : number;
    translateX? : Animated.SharedValue<number> | undefined;
    onPress?: (position: { x: number; y: number }) => void | undefined;
    scaleValue?: any
}

export const Post_WIDTH = StyleGuide.deviceWidth / 3.3;
const RADIUS = 45;
const styles = StyleSheet.create({
    gradient: {
        borderRadius: RADIUS,
        width: RADIUS * 2,
        height: RADIUS * 2,
        borderWidth: 6,
        borderColor: '#FFFFFF'
    },
    container : {
        width:Post_WIDTH, alignItems:'center'
    }
})

const PostComponent = ({ color , index, translateX, onPress, scaleValue } : PostProps) => {

    const inputRange = [
        -Post_WIDTH * (index + 1),
        -Post_WIDTH * index,
        -Post_WIDTH * (index - 1),
    ];

    if(translateX && onPress){

        const animateStyle =  useAnimatedStyle(()=>{
            const angle = interpolate(
                translateX.value,
                inputRange,
                [0, Math.PI / 4, Math. PI / 2],
                Extrapolate.CLAMP
            );
            const translateY = -100 * Math.cos(angle);
            const scale = 0.6 + 0.4 * Math.sin(angle);
            return {
                transform : [
                    { translateX: translateX.value },
                    { translateY: translateY },
                    { scale : scale }
                ]
            }
        })

        const onGestureEvent = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
            {
                onActive: ({ absoluteX: x, absoluteY: y }) => {
                    runOnJS(onPress)({x,y});
                },
        });

        return (
            <TapGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.container,animateStyle]}>
                    <View style={ [ styles.gradient , {  backgroundColor: color.start, justifyContent:'center',alignItems:'center' } ]} >
                        <Text style={{ color: color.end }}>{color.end}</Text>
                        <Text style={{ color: '#9428dd' }}>{'Tap Tap'}</Text>
                    </View>
                </Animated.View>
            </TapGestureHandler>
        )
    }else{
        return (
            <RAnimated.View style={[styles.container,{
                borderWidth: 1,
                borderColor: color.end,
                transform : [
                    {scale : scaleValue},
                    {rotate: '90deg' }
                ]
            }]}>
                <View style={ [ styles.gradient , {  backgroundColor: color.start, justifyContent:'center',alignItems:'center' } ]}>
                    <Text style={{ color: '#9428dd' }}>{color.end}</Text>
                </View>
            </RAnimated.View>
        )
    }
};

export default PostComponent;
