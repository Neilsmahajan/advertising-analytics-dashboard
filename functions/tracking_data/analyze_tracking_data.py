from flask import jsonify
import requests
from bs4 import BeautifulSoup

def analyze_tracking_data(req):
    """
    Scrape the given URL for analytics and tracking tags in the HTML source and provide user-friendly descriptions.
    """
    data = req.get_json()
    url = data.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        # Fetch the webpage content
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        html = response.text

        # Parse the HTML content
        soup = BeautifulSoup(html, "html.parser")
        
        # Mapping of keywords to user-friendly names
        tracking_keywords = {
            "googletagmanager.com": "Google Tag Manager",
            "google-analytics.com": "Google Analytics",
            "g.doubleclick.net": "Google Ads DoubleClick",
            "fbq(": "Facebook Pixel",
            "connect.facebook.net": "Facebook SDK",
            "bat.bing.com": "Bing UET",
            "static.hotjar.com": "Hotjar",
            "cdn.amplitude.com": "Amplitude",
            "analytics.twitter.com": "Twitter Analytics",
            "snap.licdn.com": "LinkedIn Insight Tag",
            "quantserve.com": "Quantcast",
            "adroll.com": "AdRoll",
            "gtag('config'": "Google Global Site Tag",
        }

        # Store analytics and tracking tags found
        analytics_tags = []

        # Search <script> tags
        for script in soup.find_all("script", src=True):
            src = script["src"]
            for keyword, description in tracking_keywords.items():
                if keyword in src:
                    analytics_tags.append(description)
        
        # Search inline <script> content
        for script in soup.find_all("script"):
            if script.string:
                content = script.string
                for keyword, description in tracking_keywords.items():
                    if keyword in content:
                        analytics_tags.append(description)

        # Search <iframe> tags
        for iframe in soup.find_all("iframe", src=True):
            src = iframe["src"]
            for keyword, description in tracking_keywords.items():
                if keyword in src:
                    analytics_tags.append(description)

        # Deduplicate the results
        analytics_tags = list(set(analytics_tags))

        # Return the analytics tags or a message if none found
        if analytics_tags:
            return jsonify({"analytics_tags": analytics_tags})
        else:
            return jsonify({"message": "No analytics or tracking tags found."})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Request failed: {e}"})
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"})