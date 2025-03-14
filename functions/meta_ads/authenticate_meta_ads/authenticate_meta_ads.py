import os
from flask import jsonify


def authenticate_meta_ads(req):
    data = req.get_json() or {}
    lang = data.get("lang", "en")
    redirection_uri = (
        "https://advertisinganalyticsdashboard.com/fr/meta-ads"
        # "http://localhost:3000/fr/meta-ads"
        if lang == "fr"
        else "https://advertisinganalyticsdashboard.com/en/meta-ads"
        # "http://localhost:3000/en/meta-ads"
    )
