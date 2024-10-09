import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import OnboaringScreen from '../screens/OnboaringScreen';
import TodoScreen from '../screens/TodoScreen';


const Stack = createNativeStackNavigator();

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Todo'>
                <Stack.Screen name='Onboarding' component={OnboaringScreen} />
                <Stack.Screen name='Home' component={HomeScreen} />
                <Stack.Screen name='Todo' component={TodoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router