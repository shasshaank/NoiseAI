import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import Auth from '@react-native-firebase/auth';
import { StackActions, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen() {
    const navigation = useNavigation();
    const [routeName, setRouteName] = useState('Login');

    useEffect(() => {
        const unsubscribe = Auth().onAuthStateChanged(user => {
            setRouteName(user ? 'Choice' : 'Login');
        });

        return () => unsubscribe();
    }, []);

    return (
        <ImageBackground
            source={require('./appBackground.jpg')} 
            style={styles.container}
        >
            <LinearGradient colors={['#00042888', '#004e9288']} style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.titleText}>WELCOME TO NOISE AI</Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.dispatch(StackActions.replace(routeName));
                        }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Signup');
                        }}
                        style={[styles.button, styles.signupButton]} 
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    titleText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 36,
        textAlign: 'center',
        fontFamily: 'Exo2-Bold',
        marginBottom: 30,
        textShadowColor: '#000', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    button: {
        marginTop: 20,
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#004e92',
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, 
    },
    signupButton: {
        marginTop: 15,  
        backgroundColor: '#0078d4', 
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontFamily: 'Exo2-Bold',
    },
};
