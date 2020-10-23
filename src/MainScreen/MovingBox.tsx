import React, {useEffect} from 'react';
import StyleGuide from '../components/StyleGuide';
import Animated, {cancelAnimation, Easing, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
const backColor = ['#171616','#bab023','#23ba62','#c7e68a','#238fba','#58e1e8','#3c23ba','#ad23ba','#ba2371','#ba2323','#ede4e4']

const MovingBox = (props) => {

    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const opacityShared = useSharedValue(1);
    const borderRadius = useSharedValue(5);
    const backgroundC = useSharedValue('');
    const HandlerAnimation = () => {
        cancelAnimation(offsetX);
        cancelAnimation(offsetY);
        backgroundC.value = backColor[Math.floor(Math.random() * 11)]  // 0 ~ 10
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

    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            borderRadius : borderRadius.value,
            opacity: opacityShared.value,
            backgroundColor: backColor[Math.floor(Math.random() * 11)] || '#171616',
            transform: [
                {translateX: offsetX.value * 120},
                {translateY: offsetY.value * 300}
            ],
        };
    });

    useEffect(() => {
        if(props.boxControl === true){
            HandlerAnimation()
        }else{
            HandlerAnimation()
        }
        return () => {
            console.log('debug 컴포넌트가 화면에서 사라짐');
        };
    }, [props.boxControl]);

    return (<Animated.View style={[StyleGuide.movingBox, animatedStyles]}/>)
};
export default MovingBox;
