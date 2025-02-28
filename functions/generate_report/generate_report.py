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
    elif service == "Google Ads":
        campaigns = results.get("campaigns", [])
        table_rows = ""
        if campaigns:
            table_rows = "".join(
                f"<tr><td>{campaign['id']}</td><td>{campaign['name']}</td>"
                f"<td>{float(campaign['average_cost']):.2f}</td><td>{float(campaign['average_cpc']):.2f}</td>"
                f"<td>{float(campaign['average_cpm']):.2f}</td><td>{float(campaign['clicks']):.2f}</td>"
                f"<td>{float(campaign['conversions']):.2f}</td><td>{float(campaign['engagements']):.2f}</td></tr>"
                for campaign in campaigns
            )
        else:
            table_rows = "<tr><td colspan='8'>No data available</td></tr>"
        results_html = f"""
        <table>
            <thead>
                <tr>
                    <th>Campaign ID</th>
                    <th>Campaign Name</th>
                    <th>Average Cost</th>
                    <th>Average CPC</th>
                    <th>Average CPM</th>
                    <th>Clicks</th>
                    <th>Conversions</th>
                    <th>Engagements</th>
                </tr>
            </thead>
            <tbody>
                {table_rows}
            </tbody>
        </table>
        """
    elif service == "Tracking Data":
        results_html = f"""
        <ul>
            {''.join(f"<li>{tag}: {results['tag_descriptions'].get(tag, '')}</li>" for tag in results['analytics_tags'])}
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
        # Build totals table
        totals_html = f"""
        <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
            <thead>
                <tr>
                    <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Total Impressions</th>
                    <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Total Clicks</th>
                    <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Total Spend</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding:8px; border:1px solid #ddd;">{results.get('total_impressions', 0)}</td>
                    <td style="padding:8px; border:1px solid #ddd;">{results.get('total_clicks', 0)}</td>
                    <td style="padding:8px; border:1px solid #ddd;">{results.get('total_spend', 0.0)}</td>
                </tr>
            </tbody>
        </table>
        """
        # Build campaigns table
        campaigns = results.get("campaigns", [])
        if campaigns:
            campaigns_html = f"""
            <h3 style="color:#47adbf; margin-bottom:10px;">Campaign Details</h3>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Campaign ID</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Campaign Name</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Impressions</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Clicks</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Spend</th>
                    </tr>
                </thead>
                <tbody>
                    {''.join(
                        f"<tr>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{c.get('CampaignId')}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{c.get('CampaignName')}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{c.get('Impressions')}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{c.get('Clicks')}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{c.get('Spend')}</td>"
                        f"</tr>" for c in campaigns
                    )}
                </tbody>
            </table>
            """
        else:
            campaigns_html = "<p>No campaign data available.</p>"
        results_html = totals_html + campaigns_html
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
            th, td {{ padding: 8px; text-align: left; border: 1px solid #ddd; }}
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
