import os
import numpy as np
from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
from CONFIG import Config
from api.utils.image_helpers import preprocess_image

api_bp = Blueprint('api', __name__)

model = None

def init_model():
    global model
    print(f" * Loading AI Model from {Config.MODEL_PATH}...")
    try:
        model = load_model(Config.MODEL_PATH)
        print(" * Model loaded successfully!")
    except Exception as e:
        print(f" * CRITICAL ERROR: Could not load model. {e}")
        print("   -> Ensure .h5 file is in the backend folder")
        model = None

@api_bp.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({'error': 'Model is not loaded.'}), 500

    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 401
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    Config.ensure_dirs()
    temp_path = os.path.join(Config.TEMP_UPLOAD_FOLDER, file.filename)
    file.save(temp_path)

    try:
        processed_img = preprocess_image(temp_path)
        
        if processed_img is None:
             return jsonify({'error': 'Image processing failed'}), 400

        prediction = model.predict(processed_img, verbose=0)

        class_index = np.argmax(prediction)
        result_class = Config.CLASS_LABELS[class_index]
        confidence = float(np.max(prediction))

        response = {
            'class': result_class,
            'confidence': f"{confidence * 100:.2f}%",
            'raw_probabilities': prediction.tolist()
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)