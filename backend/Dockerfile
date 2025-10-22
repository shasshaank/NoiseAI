# Use a stable Python base matching your requirements
FROM python:3.11-slim

# Prevent Python from writing pyc files and buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV MPLCONFIGDIR=/tmp/.cache/matplotlib

# Install system dependencies required by librosa and other packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ffmpeg \
    libsndfile1 \
    libopenblas-dev \
    gfortran \
    pkg-config \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install
COPY requirements.txt /app/
RUN pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and data (if included in repo)
COPY . /app

# Expose port
EXPOSE 8080

# Use gunicorn to run the Flask app; Render provides PORT env var
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 1 "application:app"
