import os

class Config:
    DEBUG = True
    PORT = 5000
    HOST = "127.0.0.1"

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(BASE_DIR, 'lung_cancer_vgg16_model.h5')

    IMG_HEIGHT = 128
    IMG_WIDTH = 128
    CLASS_LABELS = ['Adenocarcinoma', 'Benign', 'Squamous Cell Carcinoma']

    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    TEMP_UPLOAD_FOLDER = os.path.join(BASE_DIR, 'temp_uploads')

    @staticmethod
    def ensure_dirs():
        if not os.path.exists(Config.TEMP_UPLOAD_FOLDER):
            os.makedirs(Config.TEMP_UPLOAD_FOLDER)