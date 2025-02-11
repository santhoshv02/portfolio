from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_message', methods=['POST'])
def send_message():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Here you can add code to handle the message
        # For example, sending email or saving to database
        
        return jsonify({
            'status': 'success',
            'message': 'Message sent successfully!'
        })

if __name__ == '__main__':
    app.run(debug=True) 
