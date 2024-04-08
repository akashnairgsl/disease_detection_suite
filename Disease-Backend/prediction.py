import pickle
import pandas as pd
import numpy as np


def answer(data):
    model = pickle.load(open('dtree_pipe.pkl', 'rb'))   # Decision Tree model

    new_input = np.array([data['disease'], data['fever'], data['cough'], data['fatigue'], data['difficulty_breathing'],
                          data['age'], data['gender'], data['bloodpressure'], data['cholesterolLevel']], dtype=object).reshape(1, 9)

    test_df = pd.DataFrame(new_input, columns=["Disease", "Fever", "Cough", "Fatigue",
                                               "Difficulty Breathing", "Age", "Gender", "Blood Pressure", "Cholesterol Level"])

    prediction = model.predict(test_df)
    return prediction
