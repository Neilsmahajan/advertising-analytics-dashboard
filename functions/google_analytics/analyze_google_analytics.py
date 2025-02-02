from flask import jsonify, request, make_response
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import DateRange, Metric, Dimension, RunReportRequest
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv, dotenv_values
import os

# Set the environment variable for Google Application Credentials
load_dotenv()
SCOPES = ['https://www.googleapis.com/auth/analytics.readonly']

def analyze_google_analytics(req):
    data = req.get_json()
    property_id = data.get('propertyId')
    start_date = data.get('startDate')
    end_date = data.get('endDate')

    if not property_id or not start_date or not end_date:
        return make_response(jsonify({"error": "propertyID, startDate, and endDate are required"}), 400)

    credentials = Credentials.from_service_account_file(os.getenv("GOOGLE_SERVICE_ACCOUNT_CREDENTIALS"), scopes=SCOPES)
    client = BetaAnalyticsDataClient(credentials=credentials)

    request = RunReportRequest(
        property=f"properties/{property_id}",
        date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
        metrics=[Metric(name="activeUsers")],
        dimensions=[Dimension(name="country")]
    )

    response = client.run_report(request)

    result = {
        "rows": [
            {
                "country": row.dimension_values[0].value,
                "activeUsers": row.metric_values[0].value,
            }
            for row in response.rows
        ]
    }

    return make_response(jsonify(result), 200)