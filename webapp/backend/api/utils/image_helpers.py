import numpy as np
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from CONFIG import Config

def preprocess_image(image_path):
    try:
        img = load_img(image_path, target_size=(Config.IMG_HEIGHT, Config.IMG_WIDTH))

        img_array = img_to_array(img)

        img_array = img_array / 255.0

        img_batch = np.expand_dims(img_array, axis=0)
        
        return img_batch

    except Exception as e:
        print(f"Error in preprocessing: {e}")
        return None