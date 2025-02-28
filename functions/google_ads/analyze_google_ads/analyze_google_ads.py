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
_REDIRECT_URI = "https://advertisinganalyticsdashboard.com/en/google-ads"
# _REDIRECT_URI = "http://localhost:3000/en/google-ads"
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
    campaigns = get_campaigns(googleads_client, customer_id)

    # Return campaigns with metrics for each campaign.
    return {"campaigns": campaigns}


def get_campaigns(client, customer_id):
    # Update query to include required metrics.
    query = """
        SELECT
          campaign.id,
          campaign.name,
          metrics.average_cost,
          metrics.average_cpc,
          metrics.average_cpm,
          metrics.clicks,
          metrics.conversions,
          metrics.engagements
        FROM campaign
        ORDER BY campaign.id
    """
    stream = client.get_service("GoogleAdsService").search_stream(
        customer_id=customer_id, query=query
    )
    campaigns = []
    for batch in stream:
        for row in batch.results:
            campaigns.append(
                {
                    "id": row.campaign.id,
                    "name": row.campaign.name,
                    "average_cost": row.metrics.average_cost,
                    "average_cpc": row.metrics.average_cpc,
                    "average_cpm": row.metrics.average_cpm,
                    "clicks": row.metrics.clicks,
                    "conversions": row.metrics.conversions,
                    "engagements": row.metrics.engagements,
                }
            )
    return campaigns
