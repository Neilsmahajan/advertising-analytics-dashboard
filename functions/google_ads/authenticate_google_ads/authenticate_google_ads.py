import argparse
import hashlib
import os
import re
import socket
import sys
from urllib.parse import unquote
from flask import jsonify
from google_auth_oauthlib.flow import Flow

_SCOPE = "https://www.googleapis.com/auth/adwords"
# _SERVER = "127.0.0.1"
_SERVER = "localhost"
# _PORT = 8080
_PORT = 3000
_REDIRECT_URI = f"http://{_SERVER}:{_PORT}/en/google-ads"


def authenticate_google_ads(req):
    client_secrets_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "..",
        "credentials",
        "oauth_2_google_ads_client_id_and_secret.json",
    )
    scopes = [_SCOPE]
    flow = Flow.from_client_secrets_file(client_secrets_path, scopes=scopes)
    flow.redirect_uri = _REDIRECT_URI
    passthrough_val = hashlib.sha256(os.urandom(1024)).hexdigest()

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        state=passthrough_val,
        prompt="consent",
        include_granted_scopes="true",
    )
    print("Authorization url: \n" + authorization_url)
    response = {"url": authorization_url, "passthroughVal": passthrough_val}
    return jsonify(response), 200


if __name__ == "__main__":
    authenticate_google_ads()
