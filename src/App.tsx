import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen/MainScreen';
import PanGesture from './PanGesture/index';
import BouncingWave from "./BouncingWave/BouncingWave";
import TestScreen from "./TestScreen/TestScreen";
import RandomScreen from "./RandomBox/RandomScreen";
import BouncingBox from "./BouncingBox/BouncingBox";
import ScrollTypeA from "./ScrollTypeA/ScrollTypeA";

import {Routes} from './Routes';
const Stack = createStackNavigator<Routes>();
const AppRoot = () => {
    return (
        <Stack.Navigator
            initialRouteName={'MainScreen'}
            screenOptions={{headerShown: true}}>
            <Stack.Screen
                name={'MainScreen'}
                component={MainScreen}
                options={{
                    title: 'ReactNativeKaleidoscope',
                }}
            />
                <Stack.Screen
                    name={'RandomScreen'}
                    component={RandomScreen}
                    options={{
                        title: 'Random Box',
                    }}
                />
                <Stack.Screen
                    name={'PanGesture'}
                    component={PanGesture}
                    options={{
                        title: 'PanGesture',
                    }}
                />
                <Stack.Screen
                    name={'BouncingWave'}
                    component={BouncingWave}
                    options={{
                        title: 'BouncingWave',
                    }}
                />
                <Stack.Screen
                    name={'TestScreen'}
                    component={TestScreen}
                    options={{
                        title: 'Kaleidoscope Box',
                    }}
                />
                <Stack.Screen
                    name={'BouncingBox'}
                    component={BouncingBox}
                    options={{
                        title: 'Sunny',
                    }}
                />
                <Stack.Screen
                    name={'ScrollTypeA'}
                    component={ScrollTypeA}
                    options={{
                        title: 'ScrollTypeA',
                    }}
                />
        </Stack.Navigator>
    );
};

const App = () => {
    return (
            <NavigationContainer>
                <AppRoot/>
            </NavigationContainer>
    );
};

export default App;
