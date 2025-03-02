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
        headers = data.get("translatedHeaders")
        if headers:
            results_html = f"""
            <table>
                <thead>
                    <tr>
                        <th>{headers.get("date", "Date")}</th>
                        <th>{headers.get("sessions", "Sessions")}</th>
                        <th>{headers.get("bounceRate", "Bounce Rate")}</th>
                        <th>{headers.get("keyEvents", "Key Events")}</th>
                    </tr>
                </thead>
                <tbody>
                    {''.join(f"<tr><td>{row['date']}</td><td>{row['sessions']}</td><td>{row['bounceRate']}</td><td>{row['keyEvents']}</td></tr>" for row in results['rows'])}
                </tbody>
            </table>
            """
        else:
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
        if campaigns:
            google_ads_html = f"""
            <h3 style="color:#47adbf; margin-bottom:10px;">Campaign Details</h3>
            <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Campaign ID</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Campaign Name</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Average Cost</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Average CPC</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Average CPM</th>
                        <th style="padding:8px; border:1px solid #ddd;">Clicks</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Conversions</th>
                        <th style="padding:8px; background-color:#47adbf; color:white; border:1px solid #ddd;">Engagements</th>
                    </tr>
                </thead>
                <tbody>
                    {''.join(
                        f"<tr>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{c.get('id')}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{c.get('name')}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{float(c.get('average_cost', 0)):.2f}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{float(c.get('average_cpc', 0)):.2f}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{float(c.get('average_cpm', 0)):.2f}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{float(c.get('clicks', 0)):.2f}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{float(c.get('conversions', 0)):.2f}</td>"
                        f"<td style='padding:8px; border:1px solid #ddd;'>{float(c.get('engagements', 0)):.2f}</td>"
                        f"</tr>" for c in campaigns
                    )}
                </tbody>
            </table>
            """
        else:
            google_ads_html = "<p>No campaign data available.</p>"

        results_html = google_ads_html
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
                    <th>Campaign ID</th>
                    <th>Campaign Name</th>
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
                {''.join(
                    f"<tr>"
                    f"<td>{row.get('campaign_id')}</td>"
                    f"<td>{row.get('campaign_name')}</td>"
                    f"<td>{row.get('date_start')}</td>"
                    f"<td>{row.get('date_stop')}</td>"
                    f"<td>{row.get('impressions')}</td>"
                    f"<td>{row.get('clicks')}</td>"
                    f"<td>{row.get('spend')}</td>"
                    f"<td>{row.get('unique_clicks')}</td>"
                    f"<td>{row.get('cpm')}</td>"
                    f"<td>{row.get('reach')}</td>"
                    f"</tr>" for row in results['data']
                )}
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
            @page {{
                size: A4 landscape;
                margin: 10mm;
            }}
            body {{ 
                font-family: Arial, sans-serif; 
                font-size: 10px;
            }}
            h1 {{ 
                color: #00BFFF; 
                font-size: 14px;
            }}
            .section {{ 
                margin-bottom: 20px; 
            }}
            .section h2 {{ 
                color: #47adbf; 
                font-size: 12px;
            }}
            table {{
                width: 100%;
                border-collapse: collapse;
                table-layout: fixed;
                word-wrap: break-word;
                font-size: 10px;
            }}
            th, td {{ 
                padding: 4px; 
                text-align: left; 
                border: 1px solid #ddd; 
            }}
            th {{ 
                background-color: #47adbf; 
                color: white; 
            }}
            pre {{ 
                white-space: pre-wrap; 
                word-wrap: break-word; 
                font-size: 10px;
            }}
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
