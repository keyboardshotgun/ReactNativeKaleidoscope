// https://docs.swmansion.com/react-native-reanimated/docs 메뉴얼 업데이트 된듯

import React from 'react';
import {Text, TextStyleAndroid, TouchableOpacity, View} from 'react-native';
import StyleGuide from '../components/StyleGuide';
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {ColorSpace, interpolateColor} from 'react-native-redash';
import MovingBox from './MovingBox';
import { useState } from 'react';
const backColor = ['#171616','#bab023','#23ba62','#c7e68a','#238fba','#58e1e8','#3c23ba','#ad23ba','#ba2371','#ba2323','#ede4e4']

const MainScreen = ({navigation}) => {
    const [start,setStart] = useState(false)
    const backgroundD = useSharedValue('');

    const HandlerAnimation = () => {
        backgroundD.value = backColor[Math.floor(Math.random() * 11)];
        start ? setStart(false) : setStart(true);
    }

    const animatedBackStyles = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundD.value || '#FFFFFF'
        };
    });

    return (
    <View style={StyleGuide.mainScreen}>
      <Animated.View style={[StyleGuide.mainTop, animatedBackStyles]}>
          <MovingBox boxControl={start}/>
          <MovingBox boxControl={start}/>
          <MovingBox boxControl={start}/>
      </Animated.View>
      <View style={StyleGuide.mainBottom}>
          <TouchableOpacity
              onPress={() => navigation.navigate('PanGesture')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000033'}] }>
              <Text style={StyleGuide.whiteFont}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => false}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000066'}] }>
              <Text style={StyleGuide.whiteFont}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => false}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000099'}] }>
              <Text style={StyleGuide.whiteFont}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => false}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000011'}] }>
              <Text style={StyleGuide.whiteFont}>4</Text>
          </TouchableOpacity>
      </View>
      <TouchableOpacity
          activeOpacity={0.5}
          onPress={ ()=> HandlerAnimation() }
          style={StyleGuide.pinkButton}>
            <Text style={{color:'#FFFFFF'}}>{'TAP'}</Text>
      </TouchableOpacity>
    </View>
  );
};

/*
import { interpolateColors } from "react-native-radash";
 아직 v2에서 지원하는 것이 없어서 redash 에서 뽑아서 쓰라고 함...
 const backgroundStyles = useAnimatedStyle(() => {
    // make sure to run any interpolations inside the worklet
    // callback of useAnimatedStyle is a worklet
    // but also it knows you has access the scrollOffset value
    // so now it will re-run on each scroll change change
    // usage https://wcandillon.gitbook.io/redash/colors#interpolatecolor
    const backgroundColor = interpolateColors(
      scrollOffset.value,
      [0, width, width * 2, width * 3],
      ["#BFEAF5", "#BEECC4", "#FFE4D9", "#FFDDDD"]
    );
  }, []);


   const backgroundStyles = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollOffset.value,
      [0, width, width * 2, width * 3],
      ['#BFEAF5', '#BEECC4', '#FFE4D9', '#FFDDDD']
    );
    const color = '#' + (backgroundColor & 0x00ffffff).toString(16).padStart(6, '0');
    return {backgroundColor: color};
  });

  https://github.com/wcandillon/react-native-redash/blob/fb92e506d8d3f1c40ef32ae50e93a0378e6ffaa9/src/Colors.ts#L43-L59

*/

export default MainScreen;
