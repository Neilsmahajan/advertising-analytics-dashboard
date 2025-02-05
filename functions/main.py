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
# from google_ads.analyze_google_ads import analyze_google_ads
from google_ads.oauth2 import get_google_ads_refresh_token, get_google_ads_data

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
    response = analyze_google_analytics(req)
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

@https_fn.on_request()
def analyze_google_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    # Handle actual request
    data = req.get_json()
    customer_id = data.get('customerId')
    start_date = data.get('startDate')
    end_date = data.get('endDate')

    if not customer_id or not start_date or not end_date:
        return make_response(jsonify({"error": "customerId, startDate, and endDate are required"}), 400)

    try:
        # Check if refresh token is already available
        refresh_token = os.getenv("GOOGLE_ADS_REFRESH_TOKEN")
        if not refresh_token:
            refresh_token = get_google_ads_refresh_token()
            # Store the refresh token in environment variable for future use
            os.environ["GOOGLE_ADS_REFRESH_TOKEN"] = refresh_token

        ads_data = get_google_ads_data(customer_id, start_date, end_date, refresh_token)
        response = make_response(jsonify(ads_data))
    except Exception as e:
        response = make_response(jsonify({"error": str(e)}), 500)

    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
