import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './MainScreen/MainScreen';
import PanGesture from './PanGesture/index';
import BouncingWave from "./BouncingWave/BouncingWave";
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
