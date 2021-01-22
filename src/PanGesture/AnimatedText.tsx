import React from 'react'
import Animated, {useAnimatedProps} from 'react-native-reanimated'
import {TextInput} from 'react-native-gesture-handler'
import {StyleSheet} from "react-native";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

interface AnimatedTextProps {
    text: { value : string },
}

const style = StyleSheet.create({
    default : {
        borderWidth:1
    }
})

const AnimatedText = ({ text } : AnimatedTextProps)   => {
    const animatedProps = useAnimatedProps(() => {
        return {
            text: text.value,
        }
    })
    return (
        <AnimatedTextInput
            style={style.default}
            underlineColorAndroid="transparent"
            editable={false}
            value={text.value}
            animatedProps={animatedProps}
        />
    )
}
export default AnimatedText
