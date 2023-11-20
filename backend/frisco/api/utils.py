import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import calendar
from pathlib import Path
import os
import dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

dotenv_file = os.path.join(BASE_DIR, ".env")
if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)

def send_form_completion_email(recipient_email = "#", subject = 'FRISCO Demo Form Completion'):
    sender_email = os.environ["SENDER_GMAIL"]
    sender_password = os.environ["SENDER_GMAIL_PASSWORD"]

    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = recipient_email
    message["Subject"] = subject

    message_text = "Frisco Demo Email"
    message.attach(MIMEText(message_text, "plain"))
    try:
        smtp_server = smtplib.SMTP("smtp.gmail.com", 587)
        smtp_server.starttls()
        smtp_server.login(sender_email, sender_password)

        smtp_server.sendmail(sender_email, recipient_email, message.as_string())
        print("Demo Completion email sent successfully")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

    finally:
        smtp_server.quit()
        
def get_days_in_month(year, month):
    _, last_day = calendar.monthrange(year, month)
    return list(range(1, last_day + 1))

def get_month_name(month):
    return calendar.month_name[month]