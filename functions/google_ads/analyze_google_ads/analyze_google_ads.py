from flask import jsonify


def analyze_google_ads(req):
    data = req.get_json()
    customer_id = data.get("customerId")
    current_url = data.get("currentUrl")
    passthrough_val = data.get("passthroughVal")
    result = fetch_google_ads_data(customer_id, current_url, passthrough_val)
    if "error" in result:
        return jsonify(result), 400

    return jsonify(result), 200


def fetch_google_ads_data(customer_id, current_url, passthrough_val):
    # Placeholder for fetching Google Ads data
    return {
        "average_cost": 1,
        "average_cpc": 1,
        "average_cpm": 1,
        "clicks": 1,
        "conversions": 1,
        "engagements": 1,
    }
