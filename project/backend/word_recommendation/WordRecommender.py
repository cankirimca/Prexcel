import numpy as np
from gensim.parsing.preprocessing import remove_stopwords
from gensim.parsing.preprocessing import strip_punctuation
import os
from tensorflow.python.keras.models import load_model
import gensim
import time

root = os.path.dirname(os.path.abspath(__file__))
class WordRecommender:

    def __init__(self, words, recommendations):
        self.w2v_model = gensim.models.KeyedVectors.load(root + "\\gensim.model")
        self.lstm_model = load_model(root + "\\my_model.h5")
        self.recommendations = recommendations
        self.words = words

    def generate_recommendation(self, words):
        #input_text = strip_punctuation(input_text)
        #input_text = remove_stopwords(input_text)
        #print(input_text)
        #tokens = input_text.split(' ')
        #if there is not enough input, terminate
        if len(words) < 4:
            return
        tokens = words[-4:]   
        print(tokens) 
        vector = []
        final_predictions = []
        i = 4
        for word in reversed(tokens):
            try:
                vector.append(self.w2v_model.key_to_index[word])
                i += 1
            except KeyError:
                continue
            if i == 4:
                break    
        if len(vector) < 4:
            return    
        predictions = self.lstm_model.predict(np.array([vector]))
        predictions = self.w2v_model.most_similar( predictions, [], 10)

        added = 0
        for element in predictions:
            if (element[0] not in tokens):
                final_predictions.append(element[0])
                added += 1
            if added == 5:
                break    
        return final_predictions   

    def check_recommendations(self, stop_flag):
        print("check recommendations--------------------------")
        while not stop_flag[0]:
            time.sleep(2)
            if self.words[0] == None or len(self.words[0]) < 4:
                continue
            self.recommendations.append(self.generate_recommendation(self.words[0]))
        print("recommendations ended-----------------")        
            

            
"""
wr = WordRecommender()
str = "each other overwhelmed and, frankly, pissed me off.Now, I'm a documentary filmmaker, so after going through my pissed off stage and yelling at the television and radio, my next instinct was to make a movie. And what guided me in making this film was, how was this happening? How was it that the gay rights movement was being pitted against the civil rights movement? And this wasn't just an abstract question. I'm a beneficiary of both movements, so this was actually personal. But then something else happened after that election in 2008. The march towards gay equality accelerated at a pace that surprised and shocked everyone, and is still reshaping our laws and our policies, our institutions and our entire country. And so it started to become increasingly clear to me that this pitting of the two movements against each other actually didn't make sense, and that they were in fact much, much more interconnected, and that, in fact, some of the way that the gay rights movement has been able to make such incredible gains so quickly is that used some of the same tactics and strategies that were first"
str = "If unfortunately, you are no longer interested in this program, then we request you to"
print(wr.generate_recommendation(str))
print"""
