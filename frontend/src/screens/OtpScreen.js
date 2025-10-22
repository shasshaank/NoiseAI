import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

export default function OtpScreen() {
    const [otpInput, setOtpInput] = useState("");
    const route = useRoute();
    const navigation = useNavigation();
    const { confirmData } = route.params;

    const submitOtp = async () => {
        try {
            if (confirmData) {
                const response = await confirmData.confirm(otpInput);
                Alert.alert('Success', 'Your Phone Number is Verified');
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Please request an OTP first.');
            }
        } catch (err) {
            console.log(err);
            Alert.alert('Error', 'Invalid OTP.');
        }
    };

    return (
        <ImageBackground
            source={require('./appBackground.jpg')}
            style={styles.backgroundImage}
        >
            <LinearGradient colors={['#00042888', '#004e9288']} style={styles.container}>
                <View style={styles.helloContainer}>
                    <Text style={styles.createAccountText}>Enter OTP</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="OTP"
                        placeholderTextColor="#aaa"
                        value={otpInput}
                        onChangeText={value => setOtpInput(value)}
                        keyboardType="number-pad"
                        maxLength={6}
                    />
                </View>

                <View style={styles.createButtonContainer}>
                    <TouchableOpacity onPress={submitOtp} style={styles.button}>
                        <Text style={styles.buttonText}>Submit OTP</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
}

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
});
