import os, sys
from bingads.authorization import AuthorizationData, OAuthWebAuthCodeGrant
import webbrowser
from flask import jsonify, request

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

DEVELOPER_TOKEN = os.getenv("MICROSOFT_ADS_DEVELOPER_TOKEN")  # Your developer token
ENVIRONMENT = "production"  # Change to 'production' for live data
CLIENT_ID = os.getenv("MICROSOFT_ADS_CLIENT_ID")  # Your new client ID
CLIENT_SECRET = os.getenv("MICROSOFT_ADS_CLIENT_SECRET")  # Your client secret
CLIENT_STATE = "ClientStateGoesHere"


def authenticate_microsoft_ads(req):
    data = req.get_json() or {}
    lang = data.get("lang", "en")
    redirection_uri = (
        "https://advertisinganalyticsdashboard.com/fr/microsoft-ads"
        # "http://localhost:3000/fr/microsoft-ads"
        if lang == "fr"
        else "https://advertisinganalyticsdashboard.com/en/microsoft-ads"
        # "http://localhost:3000/en/microsoft-ads"
    )

    authorization_data = AuthorizationData(
        account_id=None,
        customer_id=None,
        developer_token=DEVELOPER_TOKEN,
        authentication=None,
    )

    authentication = OAuthWebAuthCodeGrant(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        redirection_uri=redirection_uri,
        env=ENVIRONMENT,
    )
    authentication.state = CLIENT_STATE
    authorization_data.authentication = authentication
    authentication_url = authorization_data.authentication.get_authorization_endpoint()

    return jsonify({"url": authentication_url}), 200
