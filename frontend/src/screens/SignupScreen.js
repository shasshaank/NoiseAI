import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const SignUpScreen = () => {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [Name, setName] = useState('');
    const navigation = useNavigation();

    const handleDataSignUp = async () => {
        if (Password !== ConfirmPassword) {
            Alert.alert('Error', 'Passwords do not match!');
            return;
        }

        try {
            if (Email.length > 0 && Password.length > 0 && Name.length > 0) {
                const response = await auth().createUserWithEmailAndPassword(Email, Password);
                const userData = {
                    id: response.user.uid,
                    name: Name,
                    email: Email,
                };
                await firestore().collection('users').doc(response.user.uid).set(userData);

                await response.user.sendEmailVerification();
                await auth().signOut();

                Alert.alert('Success', 'Please verify your email. Check your inbox.');
                navigation.navigate('Login');
            } else {
                Alert.alert('Error', 'Please fill in all fields!');
            }
        } catch (err) {
            console.log(err);
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
                    <Text style={styles.createAccountText}>Create Account</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Name"
                        placeholderTextColor="#aaa"
                        value={Name}
                        onChangeText={value => setName(value)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        placeholderTextColor="#aaa"
                        value={Email}
                        onChangeText={value => setEmail(value)}
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#aaa"
                        value={Password}
                        onChangeText={value => setPassword(value)}
                        secureTextEntry
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Confirm Password"
                        placeholderTextColor="#aaa"
                        value={ConfirmPassword}
                        onChangeText={value => setConfirmPassword(value)}
                        secureTextEntry
                    />
                </View>

                <View style={styles.createButtonContainer}>
                    <TouchableOpacity onPress={handleDataSignUp} style={styles.button}>
                        <Text style={styles.buttonText}>Create</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Text style={styles.lastText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.lastTextLogin}>Login</Text>
                    </TouchableOpacity>
                </View>

                {message ? <Text style={styles.errorText}>{message}</Text> : null}
            </LinearGradient>
        </ImageBackground>
    );
};

export default SignUpScreen;

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
    createAccountText: {
        textAlign: 'center',
        fontSize: 35,
        color: '#fff',
        fontWeight: 'bold',
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
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Exo2-Bold',
    },
    lastText: {
        color: '#fff',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        fontFamily: 'Exo2-Regular',
    },
    lastTextLogin: {
        color: '#aaa',
        textAlign: 'center',
        marginTop: 10,
        textDecorationLine: 'underline',
        fontFamily: 'Exo2-Bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Exo2-Regular',
    },
});
