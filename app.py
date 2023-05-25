from flask import Flask, render_template, jsonify
import os

app = Flask(__name__, static_folder='www', static_url_path='')
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'www')
app.debug = True

@app.route('/')
def serve_ionic_app():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    data = {'message': 'This is sample data from the API.'}
    return jsonify(data)

if __name__ == '__main__':
    app.run()
