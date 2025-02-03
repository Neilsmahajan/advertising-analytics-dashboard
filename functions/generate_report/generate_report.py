from flask import jsonify, request, make_response
from weasyprint import HTML
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def generate_report(req):
    data = req.get_json()
    user_info = data.get('userInfo')
    query_info = data.get('queryInfo')
    results = data.get('results')

    if not user_info or not query_info or not results:
        return make_response(jsonify({"error": "userInfo, queryInfo, and results are required"}), 400)

    # Generate HTML content for the PDF
    query_data_html = ''.join(f"<p><strong>{key}:</strong> {value}</p>" for key, value in query_info.get('queryData').items())

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
        </div>
    </body>
    </html>
    """

    # Generate PDF from HTML content
    pdf = HTML(string=html_content).write_pdf()

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=report.pdf'
    return response