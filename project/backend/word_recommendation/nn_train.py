import tensorflow as tf
import numpy as np
from tensorflow.python.keras.preprocessing.text import Tokenizer
#from tensorflow.python.keras.utils import to_categorical
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Dense
from tensorflow.python.keras.layers import LSTM
from tensorflow.python.keras.layers import Embedding
from tensorflow.python.keras.layers import Activation
from tensorflow.python.keras.layers import Permute
from tensorflow.python.keras.layers import Flatten
from tensorflow.python.keras.layers import BatchNormalization
#from tensorflow.python.keras.utils import to_categorical
from gensim.parsing.preprocessing import remove_stopwords
from gensim.parsing.preprocessing import strip_punctuation
from tensorflow.python.keras.models import load_model
import re
from nltk.tokenize import sent_tokenize, word_tokenize
import warnings
import string 
import gensim
from gensim.models import Word2Vec
from sklearn.model_selection import train_test_split
import os
import gensim.downloader as gd
import time

start = time.time()

root = os.path.dirname(os.path.abspath(__file__))
"""
wv_model = gd.load('glove-wiki-gigaword-50')

ted = open(root + "\\ted.txt", "r", encoding='utf-8').read()
ted = remove_stopwords(ted)
print(ted[:100])
ted = re.sub(r"\([^()]*\)","", ted)
print(ted[:100])
ted = ted.replace('?', ' ')
ted = ted.replace('!', ' ')
ted = ted.replace('.', ' ')
ted = ted.replace('"', ' ')
ted = ted.replace(';', ' ')
ted = ted.replace(',', ' ')
#ted = strip_punctuation(ted)
print(ted[:100])

ted = ted.split()

raw_data = []
for i in range(0, len(ted), 5):
    raw_data.append(ted[i:i+5])
    
raw_data.pop(len(raw_data)-1)


data_x = []
data_y = []
for sample in raw_data:
    all_present = True
    for word in sample:
        if word not in wv_model.key_to_index:    
            all_present = False
            break
        elif wv_model.key_to_index[word]>=1000000:  
            all_present = False
            break
    if all_present:
        temp = []
        for word in sample[:4]:
            temp.append(wv_model.key_to_index[word])
        data_x.append(temp)    
        data_y.append(wv_model[sample[4]])    
    
#print(data_x[:1])
data_x = np.array(data_x)
data_y = np.array(data_y)
print(data_x.shape, data_y.shape)


text = ted

X_train,X_test,y_train,y_test = train_test_split(data_x,data_y,test_size = 0.1)

embeddings = wv_model.get_normed_vectors()
embedding_layer = Embedding(embeddings.shape[0],embeddings.shape[1], input_length=4, weights=[embeddings], trainable=False)



model = Sequential()
model.add(embedding_layer)
model.add(Permute((2,1), input_shape=(4,50)))
model.add(BatchNormalization())
model.add(Dense(50, activation='relu'))
#model.add(LSTM(4, input_shape=(4,50), activation='relu'))
model.add(Dense(4, activation='relu'))
model.add(Dense(1, activation='linear'))
model.add(Flatten())
model.compile(loss='cosine_similarity', optimizer='adam', metrics=['mean_squared_error'])

model.fit(X_train, y_train, epochs=35, batch_size=1000, validation_split=0.1)
"""
test_string = "each other overwhelmed and, frankly, pissed me off.Now, I'm a documentary filmmaker, so after going through my pissed off stage and yelling at the television and radio, my next instinct was to make a movie. And what guided me in making this film was, how was this happening? How was it that the gay rights movement was being pitted against the civil rights movement? And this wasn't just an abstract question. I'm a beneficiary of both movements, so this was actually personal. But then something else happened after that election in 2008. The march towards gay equality accelerated at a pace that surprised and shocked everyone, and is still reshaping our laws and our policies, our institutions and our entire country. And so it started to become increasingly clear to me that this pitting of the two movements against each other actually didn't make sense, and that they were in fact much, much more interconnected, and that, in fact, some of the way that the gay rights movement has been able to make such incredible gains so quickly is that used some of the same tactics and strategies that were first"

test_string = remove_stopwords(test_string)
test_string = test_string.split(' ')[-4:]
print(test_string)
test_vector = []
end1 = time.time()
model = load_model(root + "\\my_model.h5")
wv_model = gensim.models.KeyedVectors.load(root + "\\gensim.model")
for word in test_string:
    test_vector.append(wv_model.key_to_index[word])
y_pred = model.predict(np.array([test_vector]))
end2 = time.time()
print(wv_model.most_similar( y_pred, [], 10))
end3 = time.time()
print(end1 - start)
print(end2 - end1)
print(end3 - end2)
wv_model.save("gensim.model")
# save the model
#model.save('my_model.h5')
