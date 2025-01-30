# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app
from flask_cors import CORS
from flask import Flask, request

# Initialize Firebase Admin SDK
initialize_app()

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

# Import service functions
from tracking_data.analyze_tracking_data import analyze_tracking_data

# Define HTTP functions
@https_fn.on_request()
def analyze_tracking_data_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = https_fn.Response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    # Handle actual request
    response = analyze_tracking_data(req)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response