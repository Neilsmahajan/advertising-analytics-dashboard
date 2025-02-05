# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app
from flask_cors import CORS
from flask import Flask, request, make_response, jsonify
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase Admin SDK
initialize_app()

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

# Import service functions
from tracking_data.analyze_tracking_data import analyze_tracking_data
from google_analytics.analyze_google_analytics import analyze_google_analytics
from generate_report.generate_report import generate_report
from meta_ads.analyze_meta_ads import analyze_meta_ads

# Define HTTP functions
@https_fn.on_request()
def analyze_tracking_data_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    # Handle actual request
    response = analyze_tracking_data(req)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@https_fn.on_request()
def analyze_google_analytics_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    # Handle actual request
    try:
        response = analyze_google_analytics(req)
    except Exception as e:
        response = make_response(jsonify({'error': str(e)}), 500)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@https_fn.on_request()
def generate_report_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    # Handle actual request
    response = generate_report(req)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

@https_fn.on_request()
def analyze_meta_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    # Handle actual request
    response = analyze_meta_ads(req)
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response