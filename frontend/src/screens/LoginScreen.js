import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            if (email.length > 0 && password.length > 0) {
                const user = await auth().signInWithEmailAndPassword(email, password);
                if (user.user.emailVerified) {
                    Alert.alert('Success', 'You are verified');
                    navigation.dispatch(StackActions.replace('Choice'));
                } else {
                    Alert.alert('Alert', 'Please Verify Your Email. Check your inbox.');
                    await auth().currentUser?.sendEmailVerification();
                    await auth().signOut();
                }
            } else {
                Alert.alert('Error', 'Please fill in the data!');
            }
        } catch (err) {
            setMessage(err.message);
        }
    };

    return (
        <ImageBackground
            source={require('./appBackground.jpg')} 
            style={styles.backgroundImage}
        >
            <LinearGradient colors={['#00042888', '#004e9288']} style={styles.container}>
                <View style={styles.helloContainer}>
                    <Text style={styles.helloText}>Welcome to NoiseAI</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View>
                    <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
                </View>

                <View style={styles.createButtonContainer}>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Sign in</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.createButtonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Mobile')}
                        style={[styles.button, styles.phoneButton]}
                    >
                        <Text style={styles.buttonText}>Sign in with Phone</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.footerText}>
                        Don't have an account?
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.createAccountText}> Create</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                {message ? <Text style={styles.errorText}>{message}</Text> : null}
            </LinearGradient>
        </ImageBackground>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    helloContainer: {
        marginBottom: 30,
    },
    helloText: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'Exo2-Bold',
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 30,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    textInput: {
        color: '#fff',
        fontFamily: 'Exo2-Regular',
        fontSize: 16,
    },
    forgotPasswordText: {
        color: '#ffffff',
        textAlign: 'right',
        fontSize: 15,
        marginTop: 10,
        fontFamily: 'Exo2-Regular',
    },
    createButtonContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#004e92',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
    },
    phoneButton: {
        backgroundColor: '#3b5998', 
        marginTop: 10, 
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Exo2-Bold',
    },
    footerText: {
        color: '#aaa',
        textAlign: 'center',
        fontSize: 17,
        marginTop: 30,
        fontFamily: 'Exo2-Regular',
    },
    createAccountText: {
        textDecorationLine: 'underline',
        color: '#ffffff',
        fontFamily: 'Exo2-Bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Exo2-Regular',
    },
});
