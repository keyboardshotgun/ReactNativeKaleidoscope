import React, {useEffect} from 'react';
import StyleGuide from '../components/StyleGuide';
import {Text} from 'react-native';
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
const backColor = ['#171616','#bab023','#23ba62','#c7e68a','#238fba','#58e1e8','#3c23ba','#ad23ba','#ba2371','#ba2323','#ede4e4']
const positionFixed = (values) => {
    return values * 150;
}

const MovingBox = (props) => {
    const calDiff = positionFixed(props.pos)
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const opacityShared = useSharedValue(1);
    const borderRadius = useSharedValue(5);
    const backgroundC = useSharedValue('');

    const HandlerAnimation = () => {
        cancelAnimation(offsetX);
        cancelAnimation(offsetY);
        borderRadius.value = withTiming( borderRadius.value == 5 ? StyleGuide.movingBox.width / 2 : 5 ,
            {
                duration: 350,
                easing: Easing.linear
            });
        opacityShared.value = withTiming( Math.random() ,
            {
                duration: 700,
                easing: Easing.bounce
            });
        offsetX.value = withTiming( Math.floor(Math.random() * 230),
            {
                duration: 700,
                easing: Easing.bounce
            });
        offsetY.value = withTiming( Math.floor(Math.random() * 430 - calDiff),
            {
                duration: 700,
                easing: Easing.bounce
            });

    };

    const animatedStyles = useAnimatedStyle(() => {
        /*console.log('debug', offsetX.value , offsetY.value, StyleGuide.deviceWidth, StyleGuide.deviceHeight)*/
        return {
            borderRadius : borderRadius.value,
            opacity: opacityShared.value,
            backgroundColor: backgroundC.value || '#171616',
            transform: [
                {translateX: offsetX.value},
                {translateY: offsetY.value}
            ],
        };
    });

    useEffect(() => {
        if(props.boxControl === true){
            HandlerAnimation()
        }else{
            HandlerAnimation()

        }
        backgroundC.value = backColor[Math.floor(Math.random() * 11)]  // 0 ~ 10
        return () => {

        };
    }, [props.boxControl]);

    return (<Animated.View style={[StyleGuide.movingBox, animatedStyles]}>
        <Text style={{color:'#999999'}}>{props.pos}</Text>
    </Animated.View>)
};
export default MovingBox;
