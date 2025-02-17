from dotenv import load_dotenv
import os

from flask import jsonify

load_dotenv()

DEVELOPER_TOKEN = os.getenv("MICROSOFT_ADS_DEVELOPER_TOKEN")  # Your developer token
CLIENT_ID = os.getenv("MICROSOFT_ADS_CLIENT_ID")  # Your new client ID
CLIENT_SECRET = os.getenv("MICROSOFT_ADS_CLIENT_SECRET")  # Your client secret
ENVIRONMENT = "production"  # Change to 'production' for live data
REDIRECTION_URI = "http://localhost:3000"  # Update to the new redirect URI


def fetch_microsoft_ads_data(account_id, customer_id):
    """Fetch Microsoft Ads data from the Microsoft Ads API."""
    try:
        if not account_id or not customer_id:
            return {"error": "Both Account ID and Customer ID are required."}, 400

    except Exception as e:
        return {"error": str(e)}

    # Example return of impressions, clicks, and spend
    return {"data": [{"impressions": 1000, "clicks": 100, "spend": 1000}]}


def analyze_microsoft_ads(req):
    data = req.get_json()
    account_id = data.get("accountId")
    customer_id = data.get("customerId")

    result = fetch_microsoft_ads_data(account_id, customer_id)
    return jsonify(result)
