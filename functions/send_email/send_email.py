import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def send_email(name: str, email: str, phone: str, message: str) -> None:
    sender_email = "advertisinganalyticsdashboard@gmail.com"
    password = os.getenv("EMAIL_PASSWORD")
    receiver_email = "contact@advertisinganalyticsdashboard.com"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f"Contact Us Form Submission from {name}"

    body = f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}"
    msg.attach(MIMEText(body, 'plain'))

    with smtplib.SMTP('smtp.gmail.com', 587) as server:
        server.starttls()
        server.login(sender_email, password)
        server.send_message(msg)