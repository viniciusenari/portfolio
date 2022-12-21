from flask import Flask, render_template, redirect, request, flash
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
load_dotenv()

app = Flask(__name__)
app.secret_key = 'M"CyX&24cYvaDMsruaVr'

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT" : 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": os.getenv("EMAIL"),
    "MAIL_PASSWORD": os.getenv("PASSWORD")
}

app.config.update(mail_settings)
mail = Mail(app)

class Contact:
    def __init__(self, name, email, message):
        self.name = name
        self.email = email
        self.message = message

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/<lang>')
def page_english(lang):
    if lang == 'pt-br':
        return render_template('index_pt.html')
    else:
        return render_template('index.html')

@app.route('/send', methods=['GET','POST'])
def send():
    if request.method == 'POST':
        contactForm = Contact(request.form["name"], request.form["email"], request.form["message"])

        msg = Message(
            subject = f'{contactForm.name} send you a message on portfolio',
            sender = app.config.get("MAIL_USERNAME"),
            recipients = [app.config.get("MAIL_USERNAME")],
            body = f'''
                {contactForm.name} ({contactForm.email}), sent you the following message:
            
                {contactForm.message}
            '''
        )
        mail.send(msg)
        flash('Message was sent successfully.')
    
    return redirect('/')

if __name__ == '__main__':
    app.run()
