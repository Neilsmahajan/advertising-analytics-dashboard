import os, sys
from bingads.authorization import AuthorizationData, OAuthWebAuthCodeGrant
import webbrowser
from flask import jsonify

sys.path.append(os.path.abspath(os.path.dirname(__file__)))

DEVELOPER_TOKEN = os.getenv("MICROSOFT_ADS_DEVELOPER_TOKEN")  # Your developer token
ENVIRONMENT = "production"  # Change to 'production' for live data
CLIENT_ID = os.getenv("MICROSOFT_ADS_CLIENT_ID")  # Your new client ID
CLIENT_SECRET = os.getenv("MICROSOFT_ADS_CLIENT_SECRET")  # Your client secret
REDIRECTION_URI = "http://localhost:3000/en/microsoft-ads"
CLIENT_STATE = "ClientStateGoesHere"


def authenticate_microsoft_ads(req):
    authorization_data = AuthorizationData(
        account_id=None,
        customer_id=None,
        developer_token=DEVELOPER_TOKEN,
        authentication=None,
    )

    authentication = OAuthWebAuthCodeGrant(
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,  # Add client secret here
        redirection_uri=REDIRECTION_URI,  # Add redirection URI here
        env=ENVIRONMENT,
    )
    authentication.state = CLIENT_STATE
    authorization_data.authentication = authentication
    webbrowser.open(
        authorization_data.authentication.get_authorization_endpoint(), new=1
    )

    return jsonify({"status": "success", "message": "Authentication initiated"})
