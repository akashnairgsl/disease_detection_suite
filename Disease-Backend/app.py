from flask import Flask, request, jsonify, flash, redirect, url_for, session
from werkzeug.utils import secure_filename
import diseases
import gender
import prediction
import imageprediction
import bloodreport
# import prescription
import os
from dotenv import load_dotenv


UPLOAD_FOLDER = 'Uploads'
IMG_EXTENSIONS = {'png', 'jpg', 'jpeg', 'webp'}
REPORT_EXTENSIONS = {'pdf'}


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
load_dotenv()


# list of diseases

@app.route('/diseases/list', methods=['GET'])
def get_diseases():
    return diseases.diseases_list()

# choice for gender


@app.route('/patient/gender', methods=['GET'])
def get_gender():
    return gender.genders_list()


# prediction - Positive/Negative

@app.route('/disease/predict', methods=['POST'])
def get_prediction():
    data = request.json
    return jsonify({'prediction': prediction.answer(data).tolist()})


# image-prediction - Cancerous/Non-Cancerous

def allowed_image_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in IMG_EXTENSIONS


@app.route('/disease/image/predict', methods=['POST'])
def get_image_prediction():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})
    image_file = request.files['image']
    if image_file and allowed_image_file(image_file.filename):
        image_name = secure_filename(image_file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
        image_file.save(file_path)
        return jsonify({'prediction': imageprediction.answer(file_path)})
    else:
        return jsonify({'error': 'Invalid file type'})


# blood-report summary

def allowed_report_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in REPORT_EXTENSIONS


@app.route('/disease/bloodreport/summary', methods=['POST'])
def get_bloodreport_summary():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'})
    file = request.files['file']
    if file and allowed_report_file(file.filename):
        file_name = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file_name)
        file.save(file_path)
        return jsonify({'summary': bloodreport.answer(file_path)})
        # return jsonify({'message': 'File uploaded successfully'})
    else:
        return jsonify({'error': 'Invalid file type'})


# medical-prescription summary

# @app.route('/disease/prescription/summary', methods=['POST'])
# def get_prescription_summary():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image provided'})
#     image_file = request.files['image']
#     if image_file and allowed_image_file(image_file.filename):
#         image_name = secure_filename(image_file.filename)
#         file_path = os.path.join(app.config['UPLOAD_FOLDER'], image_name)
#         image_file.save(file_path)
#         return jsonify({'summary': prescription.answer(file_path)})
#     else:
#         return jsonify({'error': 'Invalid file type'})


if __name__ == '__main__':
    app.run(debug=True, port=os.getenv('PORT'))
