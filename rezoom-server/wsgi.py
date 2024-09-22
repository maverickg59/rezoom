import os
from bs4 import BeautifulSoup
from selenium import webdriver
from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
from pypdf import PdfReader

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'pdf', 'docx'}

# Initialize the Flask application
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/api/file/upload', methods=["POST", "OPTIONS"])
def handle_file():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    
    elif request.method == "POST":
        # check if the post request has the file part
        if 'file' not in request.files:
            return jsonify({"error": "No file part"}), 400
        file = request.files['file']
        # If the user does not select a file, the browser submits an empty file without a filename.
        if file.filename == '':
            return jsonify({"error": "No selected file"}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return _corsify_actual_response(jsonify({"hi": "hi"})), 200
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))
    
@app.route('/api/listing/scrape', methods=["POST", "OPTIONS"])
def scrape():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    elif request.method == "POST":
        options = webdriver.ChromeOptions()
        options.page_load_strategy = 'normal'
        driver = webdriver.Chrome(options=options)
        driver.get(request.form.get('job_listing'))
        content = driver.page_source
        soup = BeautifulSoup(content, "html.parser")
        print(soup.prettify())
        return _corsify_actual_response(jsonify({"hi": "hi"})), 200

# Run the application
if __name__ == '__main__':
    # Create upload directory if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)