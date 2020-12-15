import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import Animated, {
    Easing,
    useAnimatedGestureHandler,
    useAnimatedStyle, useDerivedValue,
    useSharedValue, withSpring, withTiming,
} from "react-native-reanimated";
import {clamp} from "../components/AnimatedHelpers";
import {PanGestureHandler} from "react-native-gesture-handler";
import StyleGuide from "../components/StyleGuide";

interface SimpleSlider{
    sliderHeight: number;
    onChangWidth: (val:number) => void;
    pointerShadow: number;
    sliderPositionFromBottom: number;
}

const SimpleSlider = (props:SimpleSlider) => {
    const { sliderHeight, onChangWidth , sliderPositionFromBottom, pointerShadow } = props;
    const boundX = StyleGuide.deviceWidth;
    const sliderWidth = boundX - (boundX * 0.2);
    const barHeight = Math.round(sliderHeight * 0.2)
    const topMargin = (((sliderHeight/2)-(barHeight/2)) / sliderHeight) * 100 + '%'
    const startX = Math.floor(boundX *  0.05);
    const endX = Math.floor(boundX - boundX *  0.2) + Math.floor(boundX *  0.05);
    const volX = useSharedValue(1);
    const volY = useSharedValue(1);
    const [textV ,setTextV] = useState(0);
    const translateX = useSharedValue(startX);

    const sliderStyle = StyleSheet.create({
        sliderBox : {
            backgroundColor: '#e5e5e5',
            justifyContent:'center',
            position:'absolute',
            width: boundX,
            height: sliderHeight,
            bottom: sliderPositionFromBottom
        },
        slider : {
            position:'absolute',
            backgroundColor:'#0078ff',
            top: topMargin,
            left: boundX * 0.1,
            height: barHeight,
            width : sliderWidth,
            borderRadius: sliderWidth / 2,
        },
        pointer :  {
            justifyContent:'center',
            alignItems:'center',
            width: sliderHeight / 2 < 40 ? 40 : sliderHeight / 2,
            height: sliderHeight / 2 < 40 ? 40 : sliderHeight / 2,
            borderRadius: sliderHeight / 2 < 40 ? 40 : sliderHeight / 2,
            left: boundX * 0.1 - startX,
            backgroundColor: '#ffffff',
            elevation: pointerShadow,
        }
    });

    const onGestureEvent = useAnimatedGestureHandler( {
        onStart: (_event, ctx) => {
            ctx.offsetX = translateX.value;
            volX.value = withSpring(1.2);
            volY.value = withSpring(1.2);
        },
        onActive: (event, ctx) => {
            translateX.value = clamp(ctx.offsetX + event.translationX, startX, endX-Math.round(boundX*0.1));
        },
        onCancel: () => {
            volX.value = withTiming(1,{
                duration: 300,
                easing : Easing.bounce
            });

            volY.value = withTiming(1,{
                duration: 300,
                easing : Easing.bounce
            });
        },
        onFinish: () => {
            volX.value = withTiming(1,{
                duration: 300,
                easing : Easing.bounce
            });

            volY.value = withTiming(1,{
                duration: 300,
                easing : Easing.bounce
            });
        }
    });

    const defaultAnimation = useAnimatedStyle(() => {
        'worklet';
        return {
            transform: [
                { translateX: translateX.value},
                { scaleY : volY.value },
                { scaleX : volX.value }
            ],
        };
    });

    const widthValue = useDerivedValue(() => {
        'worklet';
         return Math.round(((translateX.value - startX) / (endX-startX)) * 100) * 0.9
    },[translateX.value]);

    const frontBarWidth = useAnimatedStyle(() => {
        'worklet';
        return { width: widthValue.value < sliderHeight/8 ? sliderHeight/8 + '%' : widthValue.value + '%' };
    });

    const onHandlerStateChange = () => {
        'worklet';
        //const nowPosition = startX * (1-ratio) + endX * ratio; // value to pos
        const toRatio = Math.round(((translateX.value - startX) / (endX-Math.round(boundX*0.1) - startX)) * 100);  // pos to ratio
        onChangWidth(toRatio);
        setTextV(toRatio);
    };

    return (
        <View style={sliderStyle.sliderBox}>
            <View style={[sliderStyle.slider, { opacity: 0.3 }]} />
            <Animated.View style={[sliderStyle.slider, frontBarWidth]} />
            <PanGestureHandler {...{onGestureEvent, onHandlerStateChange}}>
                <Animated.View style={[defaultAnimation,sliderStyle.pointer]}>
                    <Text>{textV}</Text>
                </Animated.View>
            </PanGestureHandler>
        </View>
    );
};
export default SimpleSlider;
