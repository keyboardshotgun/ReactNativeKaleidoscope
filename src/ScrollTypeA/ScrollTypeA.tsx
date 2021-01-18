import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import StyleGuide from '../components/StyleGuide';
import PostComponent, {Post_WIDTH} from "./PostComponent";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import {snapPoint} from "react-native-redash";
import Svg, {Rect} from "react-native-svg";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeholder: {
        width: Post_WIDTH
    }
})

const splitPoints = StyleGuide.colors_data.map(( _ : object, i : number) => -i * Post_WIDTH);
const BackRectangle = Animated.createAnimatedComponent(Rect);
const ScrollTypeA = () => {

    const [colorSelection, setColorSelection] = useState({
        prevColor: StyleGuide.colors_data[0],
        nowColor: StyleGuide.colors_data[0],
        position: {x: 0, y: 0}
    });

    const translateX = useSharedValue(0);
    const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent
        , { x: number }>({
        onStart: (_, ctx) => {
            ctx.x = translateX.value;
        },
        onActive: ({translationX}, {x}) => {
            translateX.value = x + translationX;
        },
        onEnd: ({velocityX}) => {
            const delta = snapPoint(translateX.value, velocityX, splitPoints);
            translateX.value = withSpring(delta);
        }
    });

    const aniStyle = useAnimatedStyle(() => {
        return {
            backgroundColor : colorSelection.nowColor.start
        }
    })

    const aniStyleR = useAnimatedStyle(() => {
        return {
            backgroundColor : colorSelection.prevColor.start
        }
    })

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Animated.ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    bounces={true}
                    alwaysBounceHorizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={15}>
                    {
                        [...StyleGuide.colors_data].reverse().map((color, index) => {
                            return (
                                <PostComponent color={color}
                                               key={index}
                                               index={index}
                                               translateX={undefined}
                                               onPress={undefined}
                                />
                            )
                        })
                    }
                </Animated.ScrollView>
            </View>
            <Svg
                style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: StyleGuide.deviceWidth,
                height: StyleGuide.deviceHeight / 2,
                backgroundColor : 'transparent'
            }}>
                <BackRectangle
                    animatedProps={aniStyle}
                    fill={colorSelection.nowColor.start}
                    width={'50%'}
                    height={'100%'}
                    x={0}
                    y={0}
                />
                <BackRectangle
                    animatedProps={aniStyleR}
                    fill={colorSelection.prevColor.start}
                    width={'50%'}
                    height={'100%'}
                    x={StyleGuide.deviceWidth/2}
                    y={0}
                />
            </Svg>
            <PanGestureHandler onGestureEvent={onGestureEvent}>
                <Animated.View style={[styles.subContainer]}>
                    <View style={styles.placeholder}/>
                    {
                        StyleGuide.colors_data.map( ( color : { start: string, end : string  } , index : number ) => {
                            return (
                                <PostComponent
                                    color={color}
                                    key={index}
                                    index={index}
                                    translateX={translateX}
                                    onPress={(position) => {
                                        translateX.value = withSpring(-index * Post_WIDTH);
                                        setColorSelection({
                                            position,
                                            prevColor: colorSelection.nowColor,
                                            nowColor: color,
                                        });
                                    }}
                                />
                            )
                        })
                    }
                </Animated.View>
            </PanGestureHandler>
        </View>
    )
}

export default ScrollTypeA;
