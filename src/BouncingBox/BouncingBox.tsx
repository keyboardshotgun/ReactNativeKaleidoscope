// svg test
import React from 'react';
import Svg, {
    Circle,
} from 'react-native-svg';

import {View} from "react-native";
import {StyleGuide} from "../components";
{/*viewBox = "<min-x>, <min-y>, <width>, <height>"*/}

const BouncingBox = () => {
    return (
        <View style={StyleGuide.mainScreen}>
            <Svg height={'200'} width={'200'} viewBox={"0 0 100 100"}>
                <Circle
                    cx={-50}
                    cy={50}
                    r={30}
                    strokeWidth={10}
                    fill={"transparent"}
                    stroke={"blue"}
                    strokeDasharray={ 2 * Math.PI * 30 }
                    strokeDashoffset={ 40 }
                    skewX={0}
                    skewY={0}
                    transform="rotate(270)"
                />
            </Svg>
        </View>
    )
}

export default  BouncingBox;
