import os
from flask import json, jsonify
from urllib.parse import urlparse, parse_qs

from google.ads.googleads.client import GoogleAdsClient
from google_auth_oauthlib.flow import Flow

_SCOPE = [
    "https://www.googleapis.com/auth/adwords",
    "openid",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
]
# _SERVER = "127.0.0.1"
_SERVER = "localhost"
# _PORT = 8080
_PORT = 3000
_REDIRECT_URI = f"http://{_SERVER}:{_PORT}/en/google-ads"
DEVELOPER_TOKEN = os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN")  # Your developer token


def analyze_google_ads(req):
    data = req.get_json()
    customer_id = data.get("customerId")
    current_url = data.get("currentUrl")
    result = fetch_google_ads_data(customer_id, current_url)
    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200


def fetch_google_ads_data(customer_id, response_uri):
    """Fetch Google Ads data."""
    try:
        if not customer_id or not response_uri:
            return {"error": "Both Account ID and Customer ID are required."}
    except Exception as e:
        return {"error": str(e)}

    # Get code from response_uri
    parsed_url = urlparse(response_uri)
    query_params = parse_qs(parsed_url.query)
    code = query_params.get("code", [None])[0]
    print(f"Code: {code}")

    client_secrets_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "..",
        "credentials",
        "oauth_2_google_ads_client_id_and_secret.json",
    )
    scopes = _SCOPE
    flow = Flow.from_client_secrets_file(client_secrets_path, scopes=scopes)
    flow.redirect_uri = _REDIRECT_URI

    # Pass the code back into the OAuth module to get a refresh token.
    flow.fetch_token(code=code, include_client_id=True)
    refresh_token = flow.credentials.refresh_token
    print(f"Refresh token: {refresh_token}")
    with open(client_secrets_path, "r") as f:
        client_secrets = json.load(f)
    client_id = client_secrets["web"]["client_id"]
    client_secret = client_secrets["web"]["client_secret"]

    credentials = {
        "developer_token": DEVELOPER_TOKEN,
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret,
        "use_proto_plus": True,
    }

    googleads_client = GoogleAdsClient.load_from_dict(credentials)
    print("Campaigns: ", get_campaigns(googleads_client, customer_id))

    # Placeholder for fetching Google Ads data
    return {
        "average_cost": 1,
        "average_cpc": 1,
        "average_cpm": 1,
        "clicks": 1,
        "conversions": 1,
        "engagements": 1,
    }


def get_campaigns(client, customer_id):
    ga_service = client.get_service("GoogleAdsService")

    query = """
        SELECT
          campaign.id,
          campaign.name
        FROM campaign
        ORDER BY campaign.id"""

    # Issues a search request using streaming.
    stream = ga_service.search_stream(customer_id=customer_id, query=query)
    campaigns = []
    for batch in stream:
        for row in batch.results:
            print(
                f"Campaign with ID {row.campaign.id} and name "
                f'"{row.campaign.name}" was found.'
            )
            campaigns.append({"id": row.campaign.id, "name": row.campaign.name})
            # [END get_campaigns]
    return campaigns
