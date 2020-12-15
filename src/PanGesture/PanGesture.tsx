import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle, useDerivedValue, withTiming, Easing, useAnimatedProps, withSpring, withRepeat, cancelAnimation,
  /*withDecay,
  withSpring,*/
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {clamp} from '../components/AnimatedHelpers';
import SimpleSlider from "./SimpleSlider";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const BoxSize = 150;

interface GestureProps {
  width: number;
  height: number;
}

const Gesture = ({width, height}: GestureProps) => {
  const boundX = width - BoxSize;
  const boundY = height - BoxSize;
  const translateX = useSharedValue(boundX / 2);
  const translateY = useSharedValue(boundY / 2);
  const tX = useSharedValue(boundX / 2);
  const tY = useSharedValue(boundY / 2);
  const roT = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler<{
    offsetX: number;
    offsetY: number;
  }>({
    onStart: (_event, ctx) => {
      ctx.offsetX = translateX.value;
      ctx.offsetY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = clamp(ctx.offsetX + event.translationX, 0, boundX);
      translateY.value = clamp(ctx.offsetY + event.translationY, 0, boundY);
    }
  });

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const onHandlerStateChange = () => {
    tX.value = withTiming(translateX.value, {
      duration: 300,
      easing: Easing.bounce
    });
    tY.value = withTiming(translateY.value,{
      duration: 300,
      easing: Easing.bounce
    });
  }

  const style2 = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: tX.value},
        {translateY: tY.value},
        {rotateZ : roT.value + 'deg'},
      ],
    };
  });

  const onChangWidth = (val:number) => {
    cancelAnimation(roT);
    roT.value = withSpring(Math.abs(val) * Math.PI , {
      velocity: 0.6
    })
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[style2,{width:BoxSize,height:BoxSize,opacity:0.5,backgroundColor:'#770000',position:'absolute'}]} />
      <PanGestureHandler {...{onGestureEvent, onHandlerStateChange}}>
        <Animated.View {...{style}}>
          <View style={{width:BoxSize,height:BoxSize,backgroundColor:'#FF0000',opacity:0.8}} />
        </Animated.View>
      </PanGestureHandler>
      <SimpleSlider
          onChangWidth={(val) => onChangWidth(val)}
          sliderPositionFromBottom={0}
          sliderHeight={90}
          pointerShadow={2}
      />
    </View>
  );
};

export default Gesture;
