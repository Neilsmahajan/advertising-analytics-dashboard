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
        "customerId": customer_id,
        "currentUrl": current_url,
        "passthroughVal": passthrough_val,
    }
