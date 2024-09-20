from flask import Flask
from pypdf import PdfReader

# Initialize the Flask application
app = Flask(__name__)

# create pdf object
reader = PdfReader('../resume_template.pdf')

print(len(reader.pages))
print(reader.pages[0].extract_text())

# Define a route for the root URL
@app.route('/')
def hello_world():
    return "hello world"

# Run the application
if __name__ == '__main__':
    app.run(debug=True)