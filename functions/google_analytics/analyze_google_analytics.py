from flask import jsonify, make_response
from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Metric,
    Dimension,
    RunReportRequest,
)
from google.oauth2 import service_account
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]


def analyze_google_analytics(req):
    data = req.get_json()
    property_id = data.get("propertyId")
    start_date = data.get("startDate")
    end_date = data.get("endDate")

    if not property_id or not start_date or not end_date:
        response = make_response(
            jsonify({"error": "propertyID, startDate, and endDate are required"}), 400
        )
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

    try:
        credentials = service_account.Credentials.from_service_account_file(
            os.getenv("GOOGLE_SERVICE_ACCOUNT_CREDENTIALS"), scopes=SCOPES
        )

        client = BetaAnalyticsDataClient(credentials=credentials)

        request = RunReportRequest(
            property=f"properties/{property_id}",
            date_ranges=[DateRange(start_date=start_date, end_date=end_date)],
            dimensions=[Dimension(name="date")],
            metrics=[
                Metric(name="sessions"),
                Metric(name="totalUsers"),
                Metric(name="bounceRate"),
                Metric(name="averageSessionDuration"),
                Metric(name="purchaseRevenue"),
                Metric(name="transactions"),
            ],
        )

        response = client.run_report(request)

        result = {
            "rows": [
                {
                    "date": row.dimension_values[0].value,
                    "sessions": row.metric_values[0].value,
                    "totalUsers": row.metric_values[1].value,
                    "bounceRate": row.metric_values[2].value,
                    "avgSessionDuration": row.metric_values[3].value,
                    "purchaseRevenue": row.metric_values[4].value,
                    "transactions": row.metric_values[5].value,
                }
                for row in response.rows
            ]
        }

        return_response = make_response(jsonify(result), 200)
        return_response.headers["Access-Control-Allow-Origin"] = "*"
        return return_response

    except Exception as e:
        response = make_response(jsonify({"error": f"An error occurred: {e}"}), 500)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response
