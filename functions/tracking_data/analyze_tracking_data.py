from flask import jsonify
import requests
from bs4 import BeautifulSoup


def analyze_tracking_data(req):
    data = req.get_json()
    url = data.get("url")
    if not url:
        return jsonify({"error": "URL is required"}), 400

    # Auto prepend "https://" if the scheme is missing
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url

    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        html = response.text

        soup = BeautifulSoup(html, "html.parser")

        tracking_keywords = {
            "googletagmanager.com": "Google Site Tag",
            "google-analytics.com": "Google Analytics",
            "merchantGoogleAnalytics": "Google Analytics",
            "g.doubleclick.net": "Google Ads DoubleClick",
            "fbq(": "Facebook Pixel",
            "facebook_pixel": "Facebook Pixel",
            "connect.facebook.net": "Facebook SDK",
            "bat.bing.com": "Bing Universal Event Tracking",
            "static.hotjar.com": "Hotjar",
            "cdn.amplitude.com": "Amplitude",
            "analytics.twitter.com": "Twitter Analytics",
            "snap.licdn.com": "LinkedIn Insight Tag",
            "quantserve.com": "Quantcast",
            "adroll.com": "AdRoll",
            "gtag('config'": "Google Site Tag",
            "myshopify.com": "Shopify",
            "chimpstatic.com": "Mailchimp",
            "boldapps.net": "Bold Commerce",
            "Google Ads Enhanced Conversion": "Google Ads Conversion Tracking",
            "automizely-analytics.com": "Automizely",
        }

        analytics_tags = []

        for script in soup.find_all("script", src=True):
            src = script["src"]
            for keyword, description in tracking_keywords.items():
                if keyword in src:
                    analytics_tags.append(description)

        for script in soup.find_all("script"):
            if script.string:
                content = script.string
                for keyword, description in tracking_keywords.items():
                    if keyword in content:
                        analytics_tags.append(description)

        for iframe in soup.find_all("iframe", src=True):
            src = iframe["src"]
            for keyword, description in tracking_keywords.items():
                if keyword in src:
                    analytics_tags.append(description)

        analytics_tags = list(set(analytics_tags))

        if analytics_tags:
            return jsonify({"analytics_tags": analytics_tags})
        else:
            return jsonify({"message": "No analytics or tracking tags found."})

    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Request failed: {e}"})
    except Exception as e:
        return jsonify({"error": f"An error occurred: {e}"})
