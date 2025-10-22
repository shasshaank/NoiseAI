import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from "@react-native-firebase/auth";
import LinearGradient from 'react-native-linear-gradient';

export default function MobileNumberScreen() {
    const [mobile, setMobile] = useState("");
    const navigation = useNavigation();

    const sendOtp = async () => {
        try {
            const formattedMobile = `+91${mobile.trim()}`;

            if (mobile.trim().length !== 10) {
                Alert.alert("Error", "Please enter a valid 10-digit mobile number.");
                return;
            }

            const response = await auth().signInWithPhoneNumber(formattedMobile);
            Alert.alert("Success", "OTP sent!");
            navigation.navigate('Otp', { confirmData: response });
        } catch (err) {
            console.log(err);
            Alert.alert("Error", "Failed to send OTP. Please ensure the phone number is correct.");
        }
    };

    return (
        <ImageBackground
            source={require('./appBackground.jpg')} 
            style={styles.backgroundImage}
        >
            <LinearGradient colors={['#00042888', '#004e9288']} style={styles.container}>
                <View style={styles.helloContainer}>
                    <Text style={styles.createAccountText}>Enter Mobile Number</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mobile Number"
                        placeholderTextColor="#aaa"
                        value={mobile}
                        onChangeText={value => setMobile(value)}
                        keyboardType="phone-pad"
                        maxLength={10}
                    />
                </View>

                <View style={styles.createButtonContainer}>
                    <TouchableOpacity onPress={sendOtp} style={styles.button}>
                        <Text style={styles.buttonText}>Send OTP</Text>
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
