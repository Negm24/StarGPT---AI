# import os

# # --- 1. SYSTEM CONFIGURATION ---
# # We force these settings before importing ANY other custom modules
# # to ensure TensorFlow sees them immediately.
# os.environ['CUDA_VISIBLE_DEVICES'] = '-1'  # Force CPU
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Reduce warnings

from flask import Flask
from flask_cors import CORS
from CONFIG import Config
from api.model import api_bp, init_model

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.config.from_object(Config)
    app.register_blueprint(api_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    print(f" * Starting Server on {Config.HOST}:{Config.PORT}")

    init_model()
    print(app.url_map)

    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)