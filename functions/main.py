# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app

# Initialize Firebase Admin SDK
initialize_app()

# Import service functions
from tracking_data.tracking_data import scrape_tracking_data

# Define HTTP functions
@https_fn.on_request()
def scrape_tracking_data_function(req: https_fn.Request) -> https_fn.Response:
    return scrape_tracking_data(req)