// In App.js in a new project

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import MobileNumberScreen from './MobileNumberScreen';
import OtpScreen from './OtpScreen';
import SplashScreen from './SplashScreen';
import DLScreen from './DLScreen'
import ChoiceScreen from './ChoiceScreen'

const Stack = createNativeStackNavigator();

function MainNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Otp" component={OtpScreen} />
                <Stack.Screen name="Mobile" component={MobileNumberScreen} />
                <Stack.Screen name="DL" component={DLScreen} />
                <Stack.Screen name="Choice" component={ChoiceScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;