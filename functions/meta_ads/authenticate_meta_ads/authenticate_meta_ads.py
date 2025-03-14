import os
from flask import jsonify


def authenticate_meta_ads(req):
    data = req.get_json() or {}
    lang = data.get("lang", "en")
    redirection_uri = (
        "https://advertisinganalyticsdashboard.com/fr/meta-ads/"
        # "http://localhost:3000/fr/meta-ads"
        if lang == "fr"
        else "https://advertisinganalyticsdashboard.com/en/meta-ads/"
        # "http://localhost:3000/en/meta-ads"
    )
    try:
        url = (
            f"https://www.facebook.com/v22.0/dialog/oauth"
            f"?client_id=1578493349517464"
            f"&redirect_uri=https://advertisinganalyticsdashboard.com/en/meta-ads/"
            f"&scope=ads_read"
        )
        response = {"url": url}
        return jsonify(response), 200
    except Exception as e:
        return {"error": str(e)}