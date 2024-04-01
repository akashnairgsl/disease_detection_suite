import pandas as pd
import numpy as np
from tensorflow import keras
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img


def answer(file):
    answer = ""
    IMG_SIZE = 224

    new_model = load_model('imageclassifier.h5')

    testing = new_model.predict(np.expand_dims(img_to_array(
        load_img(file, target_size=(IMG_SIZE, IMG_SIZE)))/255.0, 0))

    if testing > 0.5:
        answer = "Non-Cancerous"
    else:
        answer = "Cancerous"

    return answer
