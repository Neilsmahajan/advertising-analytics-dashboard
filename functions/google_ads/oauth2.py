import os
import hashlib
import socket
import re
import sys
from urllib.parse import unquote
from google_auth_oauthlib.flow import Flow
from google.ads.googleads.client import GoogleAdsClient
from google.ads.googleads.errors import GoogleAdsException

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()

_SCOPE = "https://www.googleapis.com/auth/adwords"
_SERVER = "127.0.0.1"
_PORT = 8080
_REDIRECT_URI = f"http://{_SERVER}:{_PORT}"
CLIENT_SECRETS_PATH = os.getenv("GOOGLE_ADS_JSON_KEY_FILE_PATH")

def get_google_ads_refresh_token():
    flow = Flow.from_client_secrets_file(CLIENT_SECRETS_PATH, scopes=[_SCOPE])
    flow.redirect_uri = _REDIRECT_URI

    passthrough_val = hashlib.sha256(os.urandom(1024)).hexdigest()
    authorization_url, state = flow.authorization_url(
        access_type="offline",
        state=passthrough_val,
        prompt="consent",
        include_granted_scopes="true",
    )

    print("Paste this URL into your browser: ")
    print(authorization_url)
    print(f"\nWaiting for authorization and callback to: {_REDIRECT_URI}")

    code = unquote(get_authorization_code(passthrough_val))
    flow.fetch_token(code=code)
    return flow.credentials.refresh_token

def get_authorization_code(passthrough_val):
    sock = socket.socket()
    sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    sock.bind((_SERVER, _PORT))
    sock.listen(1)
    connection, address = sock.accept()
    data = connection.recv(1024)
    params = parse_raw_query_params(data)

    try:
        if not params.get("code"):
            error = params.get("error")
            message = f"Failed to retrieve authorization code. Error: {error}"
            raise ValueError(message)
        elif params.get("state") != passthrough_val:
            message = "State token does not match the expected state."
            raise ValueError(message)
        else:
            message = "Authorization code was successfully retrieved."
    except ValueError as error:
        print(error)
        sys.exit(1)
    finally:
        response = (
            "HTTP/1.1 200 OK\n"
            "Content-Type: text/html\n\n"
            f"<b>{message}</b>"
            "<p>Please check the console output.</p>\n"
        )

        connection.sendall(response.encode())
        connection.close()

    return params.get("code")

def parse_raw_query_params(data):
    decoded = data.decode("utf-8")
    match = re.search(r"GET\s\/\?(.*) ", decoded)
    params = match.group(1)
    pairs = [pair.split("=") for pair in params.split("&")]
    return {key: val for key, val in pairs}

def get_google_ads_data(customer_id, start_date, end_date, refresh_token):
    client = GoogleAdsClient.load_from_storage(CLIENT_SECRETS_PATH)
    client.oauth2_credentials.refresh_token = refresh_token

    query = f"""
        SELECT
            metrics.average_cost,
            metrics.average_cpc,
            metrics.average_cpm,
            metrics.clicks,
            metrics.conversions,
            metrics.engagements
        FROM
            customer
        WHERE
            segments.date BETWEEN '{start_date}' AND '{end_date}'
    """

    try:
        ga_service = client.get_service("GoogleAdsService")
        response = ga_service.search_stream(customer_id=customer_id, query=query)
        results = []
        for batch in response:
            for row in batch.results:
                results.append({
                    "average_cost": row.metrics.average_cost,
                    "average_cpc": row.metrics.average_cpc,
                    "average_cpm": row.metrics.average_cpm,
                    "clicks": row.metrics.clicks,
                    "conversions": row.metrics.conversions,
                    "engagements": row.metrics.engagements,
                })
        return results
    except GoogleAdsException as ex:
        raise Exception(f"Google Ads API request failed: {ex}")
