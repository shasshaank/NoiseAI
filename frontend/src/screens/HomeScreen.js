import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, ActivityIndicator, ImageBackground, StyleSheet } from 'react-native';
import { Picker as SelectPicker } from '@react-native-picker/picker';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { StackActions, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen() {
    const navigation = useNavigation();
    const currentUser = Auth().currentUser;
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (currentUser) {
            // Fetch user's name from Firestore
            firestore()
                .collection('users')
                .doc(currentUser.uid)
                .get()
                .then(documentSnapshot => {
                    if (documentSnapshot.exists) {
                        setUserName(documentSnapshot.data().name);
                    }
                })
                .catch(error => console.error('Error fetching user data:', error));
        }
    }, [currentUser]);

    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [date, setDate] = useState('');  
    const [station, setStation] = useState('');
    const [model, setModel] = useState(''); 
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initialize stations directly without API call
    const stations = [
        'BEN01', 'BEN02', 'BEN03', 'BEN04', 'BEN05',
        'CHE01', 'CHE02', 'CHE03', 'CHE04', 'CHE05',
        'DEL01', 'DEL02', 'DEL03', 'DEL04', 'DEL05',
        'HYD01', 'HYD02', 'HYD03', 'HYD04', 'HYD05',
        'KOL01', 'KOL02', 'KOL03', 'KOL04', 'KOL05',
        'LUC01', 'LUC02', 'LUC03', 'LUC04', 'LUC05',
        'MUM01', 'MUM02', 'MUM03', 'MUM04', 'MUM05',
    ];

    const handlePrediction = () => {
        if (!station || (model === 'arima' && !date) || (model !== 'arima' && (!year || !month))) {
            alert('Please enter the required fields based on the selected model!');
            return;
        }

        setLoading(true);
        const endpoint = model === 'arima' ? '/predict_arima' : '/predict_random_forest';
        const inputData = model === 'arima' 
            ? { date, station }
            : { year: parseInt(year), month: parseInt(month), station };
        
        axios.post(`http://13.232.203.243:5000${endpoint}`, inputData)
            .then(response => {
                setPredictions(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    const handleLogout = async () => {
        await Auth().signOut();
        navigation.dispatch(StackActions.replace('Login'));
    };

    return (
        <ImageBackground source={require('./appBackground.jpg')} style={styles.backgroundImage}>
            <LinearGradient colors={['#00042888', '#004e9288']} style={styles.container}>
                {currentUser ? (
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.helloText}>Welcome, {userName || 'User'}</Text>

                        <View style={styles.inputContainer}>
                            {model === 'arima' ? (
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter Date (YYYY-MM-DD)"
                                    placeholderTextColor="#ccc"
                                    value={date}
                                    onChangeText={setDate}
                                />
                            ) : (
                                <>
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Year"
                                        placeholderTextColor="#ccc"
                                        keyboardType="numeric"
                                        value={year}
                                        onChangeText={setYear}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter Month (1-12)"
                                        placeholderTextColor="#ccc"
                                        keyboardType="numeric"
                                        value={month}
                                        onChangeText={setMonth}
                                    />
                                </>
                            )}
                            
                            <SelectPicker
                                selectedValue={station}
                                style={styles.picker}
                                onValueChange={(itemValue) => setStation(itemValue)}>
                                <SelectPicker.Item label="Select Station" value="" />
                                {stations.map((station, index) => (
                                    <SelectPicker.Item key={index} label={station} value={station} />
                                ))}
                            </SelectPicker>

                            <SelectPicker
                                selectedValue={model}
                                style={styles.picker}
                                onValueChange={(itemValue) => setModel(itemValue)}>
                                <SelectPicker.Item label="Select Model" value="" />
                                <SelectPicker.Item label="Random Forest" value="rf" />
                                <SelectPicker.Item label="ARIMA" value="arima" />
                                <SelectPicker.Item label="Both" value="both" />
                            </SelectPicker>
                        </View>

                        <TouchableOpacity onPress={handlePrediction} style={styles.predictButton} disabled={loading}>
                            <Text style={styles.predictButtonText}>Get Prediction</Text>
                        </TouchableOpacity>

                        {loading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            predictions && (
                                <View style={styles.predictionContainer}>
                                    {model === 'rf' || model === 'both' ? (
                                        <>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>RF Predicted Day Value:</Text>
                                                <Text style={styles.predictionValue}>{predictions.predicted_day_value}</Text>
                                            </View>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>RF Predicted Night Value:</Text>
                                                <Text style={styles.predictionValue}>{predictions.predicted_night_value}</Text>
                                            </View>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>RF R² for Day Prediction:</Text>
                                                <Text style={styles.predictionValue}>{predictions.r2_day}</Text>
                                            </View>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>RF R² for Night Prediction:</Text>
                                                <Text style={styles.predictionValue}>{predictions.r2_night}</Text>
                                            </View>
                                        </>
                                    ) : null}

                                    {model === 'arima' || model === 'both' ? (
                                        <>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>ARIMA Predicted Day Value:</Text>
                                                <Text style={styles.predictionValue}>{predictions.Prediction}</Text>
                                            </View>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>ARIMA Predicted Night Value:</Text>
                                                <Text style={styles.predictionValue}>{predictions.Prediction2}</Text>
                                            </View>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>ARIMA R² for Day Prediction:</Text>
                                                <Text style={styles.predictionValue}>{predictions.r2_day}</Text>
                                            </View>
                                            <View style={styles.predictionCard}>
                                                <Text style={styles.predictionLabel}>ARIMA R² for Night Prediction:</Text>
                                                <Text style={styles.predictionValue}>{predictions.r2_night}</Text>
                                            </View>
                                        </>
                                    ) : null}
                                </View>
                            )
                        )}

                        <View style={styles.logoutContainer}>
                            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                                <Text style={styles.logoutButtonText}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                ) : (
                    <Text style={styles.helloText}>Loading...</Text>
                )}
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
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    helloText: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Exo2-Bold',
        marginBottom: 30,

    },
    inputContainer: {
        marginBottom: 20,
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 30,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        color: '#fff',
        fontFamily: 'Exo2-Regular',
        fontSize: 16,
    },
    picker: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 30,
        marginVertical: 10,
        color: '#fff',
        overflow: 'hidden',
        height: 50,
        paddingHorizontal: 15,
    },
    predictButton: {
        backgroundColor: '#004e92',
        paddingVertical: 12,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    predictButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Exo2-Bold',
    },
    predictionContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        padding: 15,
    },
    predictionCard: {
        marginBottom: 10,
    },
    predictionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    predictionValue: {
        fontSize: 18,
        color: '#fff',
    },
    logoutContainer: {
        marginTop: 20,
    },
    logoutButton: {
        backgroundColor: '#D32F2F',
        paddingVertical: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Exo2-Bold',
    },
});
