import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import StyleGuide from '../components/StyleGuide';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import MovingBox from '../RandomBox/MovingBox';
import {useState} from 'react';

const backColor = ['#7e7777', '#534e11', '#146937', '#5f6e42', '#15526b', '#2a686b', '#23156d', '#5d1564', '#5b1037', '#ba2323', '#605a50']

const RandomScreen = () => {
    const [start, setStart] = useState(false)
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
                <MovingBox boxControl={start} pos={0}/>
                <MovingBox boxControl={start} pos={1}/>
                <MovingBox boxControl={start} pos={2}/>
                <MovingBox boxControl={start} pos={3}/>
                <MovingBox boxControl={start} pos={4}/>
                <MovingBox boxControl={start} pos={5}/>
                <MovingBox boxControl={start} pos={6}/>
                <MovingBox boxControl={start} pos={7}/>
                <MovingBox boxControl={start} pos={8}/>
                <MovingBox boxControl={start} pos={9}/>
                <MovingBox boxControl={start} pos={10}/>
                <MovingBox boxControl={start} pos={11}/>
                <MovingBox boxControl={start} pos={12}/>
                <MovingBox boxControl={start} pos={13}/>
                <MovingBox boxControl={start} pos={14}/>
                <MovingBox boxControl={start} pos={15}/>
            </Animated.View>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => HandlerAnimation()}
                style={StyleGuide.pinkButton}>
                <Text style={{color: '#FFFFFF'}}>{'TAP'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RandomScreen;

/*
import { interpolateColors } from "react-native-radash"; // interpolateColors for v2 ???
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
