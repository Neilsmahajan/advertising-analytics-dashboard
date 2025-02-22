from flask import jsonify, make_response
from weasyprint import HTML
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()


def generate_report(req):
    data = req.get_json()
    user_info = data.get("userInfo")
    query_info = data.get("queryInfo")
    results = data.get("results")
    service = data.get("service")

    if not user_info or not query_info or not results or not service:
        return make_response(
            jsonify(
                {"error": "userInfo, queryInfo, results, and service are required"}
            ),
            400,
        )

    query_data_html = "".join(
        f"<p><strong>{key}:</strong> {value}</p>"
        for key, value in query_info.get("queryData").items()
    )

    if service == "Google Analytics":
        results_html = f"""
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Sessions</th>
                    <th>Bounce Rate</th>
                    <th>Key Events</th>
                </tr>
            </thead>
            <tbody>
                {''.join(f"<tr><td>{row['date']}</td><td>{row['sessions']}</td><td>{row['bounceRate']}</td><td>{row['keyEvents']}</td></tr>" for row in results['rows'])}
            </tbody>
        </table>
        """
    elif service == "Tracking Data":
        results_html = f"""
        <ul>
            {''.join(f"<li>{tag}</li>" for tag in results['analytics_tags'])}
        </ul>
        """
    elif service == "Meta Ads":
        results_html = f"""
        <table>
            <thead>
                <tr>
                    <th>Date Start</th>
                    <th>Date Stop</th>
                    <th>Impressions</th>
                    <th>Clicks</th>
                    <th>Spend</th>
                    <th>Unique Clicks</th>
                    <th>CPM</th>
                    <th>Reach</th>
                </tr>
            </thead>
            <tbody>
                {''.join(f"<tr><td>{row['date_start']}</td><td>{row['date_stop']}</td><td>{row['impressions']}</td><td>{row['clicks']}</td><td>{row['spend']}</td><td>{row['unique_clicks']}</td><td>{row['cpm']}</td><td>{row['reach']}</td></tr>" for row in results['data'])}
            </tbody>
        </table>
        """
    elif service == "Microsoft Ads":
        results_html = f"""
        <table>
            <thead>
                <tr>
                    <th>Total Impressions</th>
                    <th>Total Clicks</th>
                    <th>Total Spend</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{results['total_impressions']}</td>
                    <td>{results['total_clicks']}</td>
                    <td>{results['total_spend']}</td>
                </tr>
            </tbody>
        </table>
        """
    else:
        results_html = "<p>Unsupported service</p>"

    html_content = f"""
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; }}
            h1 {{ color: #00BFFF; }}
            .section {{ margin-bottom: 20px; }}
            .section h2 {{ color: #47adbf; }}
            table {{ width: 100%; border-collapse: collapse; }}
            th, td {{ padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }}
            th {{ background-color: #47adbf; color: white; }}
        </style>
    </head>
    <body>
        <h1>Report</h1>
        <div class="section">
            <h2>User Information</h2>
            <p>Name: {user_info.get('name')}</p>
            <p>Email: {user_info.get('email')}</p>
        </div>
        <div class="section">
            <h2>Query Information</h2>
            <p><strong>Service:</strong> {query_info.get('service')}</p>
            <p><strong>Query Name:</strong> {query_info.get('queryName')}</p>
            <div>{query_data_html}</div>
        </div>
        <div class="section">
            <h2>Results</h2>
            {results_html}
        </div>
    </body>
    </html>
    """

    pdf = HTML(string=html_content).write_pdf()

    response = make_response(pdf)
    response.headers["Content-Type"] = "application/pdf"
    response.headers["Content-Disposition"] = "attachment; filename=report.pdf"
    return response
