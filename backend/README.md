# Noise Backend

This repository contains a Flask backend that provides three ML endpoints:
- `/predict_random_forest` - RandomForest predictions for day/night noise
- `/predict_arima` - ARIMA time-series predictions
- `/predict_dl` - Audio classification using a Keras model

This README explains how to build and deploy to Render using Docker, and how to connect a mobile app.

## Quick local run (development)
1. Create a virtualenv and install dependencies:

```powershell
python -m venv .venv; ; .\.venv\Scripts\Activate.ps1; ; pip install -r requirements.txt
```

2. Run locally (development server):

```powershell
$env:PORT=5000; python application.py
```

Note: This runs the Flask dev server. For production use Gunicorn as shown below.

## Build & run with Docker (local)

```powershell
# build
docker build -t noise-backend:latest .
# run
docker run -p 8080:8080 -e PORT=8080 noise-backend:latest
```

## Deploy to Render (recommended)
1. Push this repo to GitHub.
2. Create a Render account and connect your GitHub repo.
3. Create a new Web Service and select Docker as the environment.
4. Set environment variables on Render:
   - `ALLOWED_ORIGIN` : origin you want to allow (or `*` for testing)
   - `MODEL_URL` (optional) : signed URL to download `my_model.keras` if not included in repo
   - `ARIMA_CSV`, `NOISE_CSV` (optional) : override csv file names/paths
5. Create the service and wait for the build to finish.

## Mobile integration
- Use HTTPS endpoint provided by Render (e.g. `https://your-service.onrender.com`).
- For authentication, prefer JWTs; mobile apps should store tokens in Keychain/Keystore.
- For audio uploads use `multipart/form-data` to `/predict_dl`.

## Health & readiness
- `/health` returns 200 when service is up.
- `/ready` returns 200 only when the ML model has been loaded.

## CI/CD
- You can let Render build from GitHub directly or build/push to a container registry and point Render to that image.

## Notes
- TensorFlow and heavier libraries may require a larger instance or more memory.
- Consider hosting large model files on S3/GCS and setting `MODEL_URL` to a signed download URL to avoid huge repo size.
