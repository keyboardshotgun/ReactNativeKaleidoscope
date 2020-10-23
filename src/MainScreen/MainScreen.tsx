// https://docs.swmansion.com/react-native-reanimated/docs 메뉴얼 업데이트 된듯

import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import StyleGuide from '../components/StyleGuide';
import Animated, {
    cancelAnimation,
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {ColorSpace, interpolateColor} from 'react-native-redash';

const MainScreen = ({navigation}) => {
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const opacityShared = useSharedValue(1);
    const borderRadius = useSharedValue(5);
    const backgroundC = useSharedValue('');

    const HandlerAnimation = () => {
        cancelAnimation(offsetX);
        cancelAnimation(offsetY);
        backgroundC.value = interpolateColor(
                    Math.random(),
                    [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],
                    ['#171616','#bab023','#23ba62','#c7e68a','#238fba','#58e1e8','#3c23ba','#ad23ba','#ba2371','#ba2323','#ede4e4'],
                    ColorSpace.RGB
        );
        borderRadius.value = withTiming( borderRadius.value == 5 ? StyleGuide.movingBox.width / 2 : 5 ,
            {
                duration: 350,
                easing: Easing.linear
            });
        opacityShared.value = withTiming( opacityShared.value == 1 ? 0.5 : 1 ,
            {
                duration: 700,
                easing: Easing.bounce
            });
        offsetX.value = withTiming( Math.random(),
            {
                duration: 700,
                easing: Easing.bounce
            });
        offsetY.value = withTiming( Math.random(),
            {
                duration: 700,
                easing: Easing.bounce
            });
    }
    const animatedStyles = useAnimatedStyle(() => {
        return {
            borderRadius : borderRadius.value,
            opacity: opacityShared.value,
            backgroundColor: backgroundC.value,
            transform: [
                {translateX: offsetX.value * 255},
                {translateY: offsetY.value * 255}
            ],
        };
    });

    return (
    <View style={StyleGuide.mainScreen}>
      <Animated.View style={StyleGuide.mainTop}><Text>TOP</Text>
          <Animated.View  style={[StyleGuide.movingBox, animatedStyles]}>
              <Text>1</Text>
          </Animated.View>
      </Animated.View>
      <View style={StyleGuide.mainBottom}>
          <TouchableOpacity
              onPress={() => navigation.navigate('PanGesture')}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000033'}] }>
              <Text style={StyleGuide.whiteFont}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={() => HandlerAnimation() }
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000066'}] }>
              <Text style={StyleGuide.whiteFont}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>false}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000099'}] }>
              <Text style={StyleGuide.whiteFont}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
              onPress={()=>false}
              style={ [StyleGuide.mainTaps, {backgroundColor: '#000011'}] }>
              <Text style={StyleGuide.whiteFont}>4</Text>
          </TouchableOpacity>
      </View>
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
