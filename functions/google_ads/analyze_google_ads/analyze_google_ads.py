from flask import jsonify
from urllib.parse import urlparse, parse_qs


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
    code = query_params.get('code', [None])[0]
    print(f"Code: {code}")
    # Placeholder for fetching Google Ads data
    return {
        "average_cost": 1,
        "average_cpc": 1,
        "average_cpm": 1,
        "clicks": 1,
        "conversions": 1,
        "engagements": 1,
    }
