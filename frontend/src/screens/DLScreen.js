import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const DLScreen = () => {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [audioPath, setAudioPath] = useState(null);
  const [audioName, setAudioName] = useState(null);
  const [player, setPlayer] = useState(null);

  const pickAudioFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio], // Pick any audio file
      });

      const originalUri = result[0].uri; // Get the original URI
      const fileName = result[0].name;

      // Copy the file to a local path accessible by react-native-sound
      const localPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.copyFile(originalUri, localPath);

      setAudioPath(localPath);
      setAudioName(fileName);
      setPrediction(null);

      Alert.alert('File Selected', `Selected file: ${fileName}`);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert.alert('Cancelled', 'You cancelled the file selection.');
      } else {
        Alert.alert('Error', 'An error occurred while picking the file.');
        console.error(error);
      }
    }
  };

  const uploadAudio = async () => {
    if (!audioPath) {
      Alert.alert('No File Selected', 'Please select an audio file first.');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('audio', {
        uri: `file://${audioPath}`,
        name: audioName || 'audio.wav',
        type: 'audio/wav',
      });

      const response = await axios.post('http://13.232.203.243:5000/predict_dl', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setPrediction(response.data.predicted_class);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred during the upload.');
      console.error(error);
    }
  };

  const playAudio = () => {
    if (!audioPath) {
      Alert.alert('No Audio Selected', 'Please select an audio file to play.');
      return;
    }

    if (player) {
      player.stop(() => setPlayer(null));
    }

    const sound = new Sound(audioPath, '', (error) => {
      if (error) {
        console.error('Failed to load the sound', error);
        return;
      }
      sound.play((success) => {
        if (success) {
          console.log('Successfully finished playing');
        } else {
          console.error('Playback failed due to an audio decoding error');
        }
        setPlayer(null);
      });
      setPlayer(sound);
    });
  };

  return (
    <ImageBackground
      source={require('./appBackground.jpg')} // Replace with your background image
      style={styles.backgroundImage}
    >
      <LinearGradient colors={['#00042888', '#004e9288']} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Audio Classifier</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={pickAudioFile}>
          <Text style={styles.buttonText}>Pick Audio File</Text>
        </TouchableOpacity>

        {audioPath && (
          <>
            <Text style={styles.fileInfo}>
              Selected File: {audioName || 'Unknown'}
            </Text>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#004e92' }]}
              onPress={uploadAudio}
            >
              <Text style={styles.buttonText}>Upload Audio File</Text>
            </TouchableOpacity>
          </>
        )}

        {loading && <ActivityIndicator size="large" color="#ffffff" />}

        {prediction && (
          <Text style={styles.result}>Predicted Class: {prediction}</Text>
        )}


        {audioPath && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#f39c12' }]}
            onPress={playAudio}
          >
            <Text style={styles.buttonText}>Play Input Audio</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.result}>Ground Truth: {prediction}</Text>

        {audioPath && (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#f39c12' }]}
            onPress={playAudio}
          >
            <Text style={styles.buttonText}>Play Output Audio</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </ImageBackground>
  );
};

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
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Exo2-Bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Exo2-Bold',
  },
  fileInfo: {
    marginTop: 10,
    fontSize: 16,
    color: '#ffffff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});

export default DLScreen;
