import argparse
import hashlib
import os
import re
import socket
import sys
from urllib.parse import unquote
from flask import jsonify
from google_auth_oauthlib.flow import Flow

_SCOPE = [
    "https://www.googleapis.com/auth/adwords",
    "openid",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
]


def authenticate_google_ads(req):
    data = req.get_json() or {}
    lang = data.get("lang", "en")
    redirection_uri = (
        "https://advertisinganalyticsdashboard.com/fr/google-ads"
        # "http://localhost:3000/fr/google-ads"
        if lang == "fr"
        else "https://advertisinganalyticsdashboard.com/en/google-ads"
        # "http://localhost:3000/en/google-ads"
    )
    client_secrets_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "..",
        "credentials",
        "oauth_2_google_ads_client_id_and_secret.json",
    )
    scopes = _SCOPE
    flow = Flow.from_client_secrets_file(client_secrets_path, scopes=scopes)
    flow.redirect_uri = redirection_uri
    passthrough_val = hashlib.sha256(os.urandom(1024)).hexdigest()

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        state=passthrough_val,
        prompt="consent",
        include_granted_scopes="true",
    )
    print("Authorization url: \n" + authorization_url)
    response = {"url": authorization_url}
    return jsonify(response), 200
