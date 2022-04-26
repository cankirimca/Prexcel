import numpy as np
from gensim.parsing.preprocessing import remove_stopwords
import os
from tensorflow.python.keras.models import load_model
import gensim
import time

root = os.path.dirname(os.path.abspath(__file__))
class WordRecommender:

    def init(self):
        self.w2v_model = gensim.models.KeyedVectors.load(root + "\\gensim.model")
        self.lstm_model = load_model(root + "\\my_model.h5")

    def generate_recommendation(self, input_text):
        tokens = input_text.split(' ')
        vector = []
        for word in tokens:
            vector.append(self.w2v_model.key_to_index[word])
        predictions = self.lstm_model.predict(np.array([vector]))    
        