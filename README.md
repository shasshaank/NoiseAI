# Noise AI 🔊

> **Predict urban noise levels before you step outside** — AI-powered noise forecasting for Indian cities using time-series machine learning and audio classification.

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-Mobile-61dafb) ![Flask](https://img.shields.io/badge/Flask-REST_API-black) ![Python](https://img.shields.io/badge/Python-3.9+-blue) ![License](https://img.shields.io/badge/License-MIT-green)

A cross-platform mobile application that forecasts zone-level noise pollution across Indian cities using ARIMA and Random Forest models, with an audio classification feature powered by machine learning.

[✨ Features](#-features) • [🧱 Tech Stack](#-tech-stack) • [⚙️ Setup](#️-setup) • [📖 Usage](#-usage)

**[📱 Download APK](#-download)**

</div>

---

## ✨ Features

### 📈 Noise Level Forecasting
- **Dual Model Prediction** — Choose between ARIMA or Random Forest before every prediction
- **Zone-based Forecasting** — Select a specific city zone to get localized noise level predictions
- **Time-series Input** — Predict noise levels at any future point in time
- **Indian City Coverage** — Trained on real Kaggle noise monitoring data from Indian urban zones

### 🎵 Audio Classification
- **Upload Audio Files** — Submit recordings directly from your device
- **Sound Identification** — Classifies everyday sounds like dogs barking, birds chirping, traffic noise, and more
- **Instant Results** — Get classification output in seconds via the Flask API

### 📱 Mobile Experience
- **Cross-platform** — Runs on both Android and iOS via React Native
- **Model Selection UI** — Clean interface to switch between ARIMA and Random Forest per prediction
- **Production APK** — Fully deployable Android build available

---

## 🧱 Tech Stack

| Category | Technologies |
| --- | --- |
| **Mobile Frontend** | React Native |
| **Backend / API** | Flask, Python |
| **ML Models** | ARIMA, Random Forest (scikit-learn) |
| **Data Processing** | Pandas, NumPy |
| **Dataset** | Kaggle Noise Monitoring Dataset (Indian Cities, 10,000+ records) |

---

## 📊 Model Performance

| Model | Accuracy | Best For |
| --- | --- | --- |
| **Random Forest** | 90%+ | Short-term predictions, non-linear patterns |
| **ARIMA** | 85%+ | Trend-based forecasting, seasonal patterns |

Both models were trained and evaluated on the Kaggle Noise Monitoring dataset containing 10,000+ time-series records across multiple Indian city zones.

---

## ⚙️ Setup

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm
- React Native CLI or Expo
- Android Studio (for APK builds)

### 1. Clone Repository

```bash
git clone https://github.com/shasshaank/NoiseAI.git
cd NoiseAI
```

### 2. Backend Setup (Flask API)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The Flask API will start at `http://localhost:5000`

### 3. Environment Variables

Create a `.env` file in the backend folder:

```env
FLASK_ENV=development
MODEL_PATH=./models/
```

### 4. Frontend Setup (React Native)

```bash
cd frontend
npm install
```

Update the API base URL in the config to point to your Flask server, then:

```bash
npx react-native run-android
# or
npx react-native run-ios
```

### 5. Build APK

```bash
cd android
./gradlew assembleRelease
```

The APK will be generated in `android/app/build/outputs/apk/release/`

---

## 📖 Usage

### Noise Level Prediction

1. Open the app and navigate to **Predict**
2. Select your **city zone** from the dropdown
3. Choose your preferred model — **ARIMA** or **Random Forest**
4. Enter the **target date and time** for prediction
5. Tap **Predict** to get the forecasted noise level

### Audio Classification

1. Navigate to the **Classify** section
2. Tap **Upload Audio** and select a file from your device (e.g. `.mp3`, `.wav`)
3. The model will identify the sound type and return a classification label

---

## 📂 Project Structure

```
NoiseAI/
├── backend/
│   ├── app.py                  # Flask API entry point
│   ├── models/
│   │   ├── arima_model.pkl     # Trained ARIMA model
│   │   └── rf_model.pkl        # Trained Random Forest model
│   ├── predict.py              # Prediction logic
│   ├── audio_classify.py       # Audio classification logic
│   └── requirements.txt
│
├── frontend/
│   ├── screens/
│   │   ├── HomeScreen.js       # Landing screen
│   │   ├── PredictScreen.js    # Noise prediction UI
│   │   └── ClassifyScreen.js   # Audio upload & classification
│   ├── components/             # Reusable UI components
│   ├── App.js                  # App entry point
│   └── package.json
│
├── notebooks/
│   └── model_training.ipynb    # Data preprocessing & model training
│
└── README.md
```

---

## 📱 Download

The production APK for Android is available in the [Releases](https://github.com/shasshaank/NoiseAI/releases) section of this repository.

---

## 🛣️ Roadmap

- [ ] Live microphone input for real-time noise level detection
- [ ] Push notifications for high noise alerts in your zone
- [ ] iOS App Store deployment
- [ ] Expand dataset coverage to more Indian cities
- [ ] LSTM model for improved long-range forecasting

---

## 📄 License

MIT License © 2025 Shashaank Jain

---

## 📧 Contact

**Shashaank Jain**

* GitHub: [@shasshaank](https://github.com/shasshaank)
* Email: shashaankjain07@gmail.com
* LinkedIn: [shashaank-jain](https://linkedin.com/in/shashaank-jain)

---

<div align="center">

Made with ❤️ by Shashaank Jain

</div>
