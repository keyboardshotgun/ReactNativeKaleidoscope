import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Animated as RAnimated } from "react-native";
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

    const scrollX = useRef(new RAnimated.Value(0)).current;

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

    useEffect(()=>{
        console.log('scrollY : ', scrollX);
    },[scrollX])

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <RAnimated.FlatList
                    data={[...StyleGuide.colors_data].reverse()}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    horizontal={true}
                    onScroll={RAnimated.event(
                    [{ nativeEvent:
                                    { contentOffset :
                                            {
                                                x : scrollX
                                            }
                                    }
                        }],
                        {useNativeDriver: true}
                    )}
                    keyExtractor={ (item) => '#'+(Math.random() * 89999999 + 100000)  }
                    renderItem={ ({item, index}) => {
                        const inputRange = [
                            0,
                            0.5,
                            Post_WIDTH * index+1,
                            Post_WIDTH * index+2,
                        ]
                        const scaleValue = scrollX.interpolate({
                            inputRange,
                            outputRange: [1, 1 , 0.5, 0.1]
                        })
                        return (
                            <PostComponent color={item}
                                           index={index}
                                           scaleValue={scaleValue}
                                           translateX={undefined}
                                           onPress={undefined}
                            />
                        )
                    }}
                />
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
                                    onPress={(position: {x: number, y: number}) => {
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
