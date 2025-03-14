from flask import Blueprint, request, jsonify
import requests

meta_ads_bp = Blueprint("meta_ads", __name__)


def fetch_meta_ads_data(ad_account_id, access_token, start_date, end_date):
    """Fetch Meta Ads data from the Meta Marketing API grouped by campaign."""
    try:
        if not ad_account_id or not access_token or not start_date or not end_date:
            return {
                "error": "All fields (Ad Account ID, Access Token, Start Date, and End Date) are required."
            }, 400
        url = (
            f"https://graph.facebook.com/v21.0/act_{ad_account_id}/insights"
            f"?access_token={access_token}"
            f"&fields=campaign_id,campaign_name,impressions,clicks,spend,unique_clicks,cpm,reach,cpc"
            f"&level=campaign"
            f'&time_range={{"since":"{start_date}","until":"{end_date}"}}'
        )
        response = requests.get(url)

        if response.status_code != 200:
            return {"error": response.json()}

        return response.json()
    except Exception as e:
        return {"error": str(e)}


def analyze_meta_ads(req):
    data = req.get_json()
    ad_account_id = data.get("adAccountId")
    access_token = data.get("accessToken")
    start_date = data.get("startDate")
    end_date = data.get("endDate")

    result = fetch_meta_ads_data(ad_account_id, access_token, start_date, end_date)
    return jsonify(result)
