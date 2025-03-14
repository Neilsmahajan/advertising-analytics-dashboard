# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app
from flask_cors import CORS
from flask import Flask, request, make_response

# Initialize Firebase Admin SDK
initialize_app()

# Create Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for the Flask app

# Import service functions
from tracking_data.analyze_tracking_data import analyze_tracking_data
from google_analytics.analyze_google_analytics import analyze_google_analytics
from generate_report.generate_report import generate_report
from meta_ads.analyze_meta_ads.analyze_meta_ads import (
    analyze_meta_ads,
)
from meta_ads.authenticate_meta_ads.authenticate_meta_ads import (
    authenticate_meta_ads,
)
from send_email.send_email import send_email
from microsoft_ads.analyze_microsoft_ads.analyze_microsoft_ads import (
    analyze_microsoft_ads,
)
from microsoft_ads.authenticate_microsoft_ads.authenticate_microsoft_ads import (
    authenticate_microsoft_ads,
)
from google_ads.analyze_google_ads.analyze_google_ads import (
    analyze_google_ads,
)
from google_ads.authenticate_google_ads.authenticate_google_ads import (
    authenticate_google_ads,
)


# Define HTTP functions
@https_fn.on_request()
def analyze_tracking_data_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response = analyze_tracking_data(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@https_fn.on_request()
def analyze_google_analytics_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response = analyze_google_analytics(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@https_fn.on_request()
def generate_report_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response = generate_report(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@https_fn.on_request()
def analyze_meta_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response = analyze_meta_ads(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@https_fn.on_request()
def authenticate_meta_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request by unpacking response and status code
    response, status_code = authenticate_meta_ads(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return make_response(response, status_code)


@https_fn.on_request()
def contact_form_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    data = req.get_json()
    name = data.get("name")
    email = data.get("email")
    phone = data.get("phone")
    message = data.get("message")

    send_email(name, email, phone, message)

    response = make_response({"status": "success"}, 200)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@https_fn.on_request()
def analyze_microsoft_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response, status_code = analyze_microsoft_ads(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return make_response(response, status_code)


@https_fn.on_request()
def authenticate_microsoft_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response, status_code = authenticate_microsoft_ads(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return make_response(response, status_code)


@https_fn.on_request()
def authenticate_google_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response, status_code = authenticate_google_ads(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return response


@https_fn.on_request()
def analyze_google_ads_function(req: https_fn.Request) -> https_fn.Response:
    # Handle preflight requests
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return response

    # Handle actual request
    response, status_code = analyze_google_ads(req)
    response.headers["Access-Control-Allow-Origin"] = "*"
    return make_response(response, status_code)
