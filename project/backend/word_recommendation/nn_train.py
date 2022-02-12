import numpy as np
import sklearn
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.layers import LSTM
from tensorflow.keras.layers import Embedding
from tensorflow.keras.layers import Activation
from gensim.parsing.preprocessing import remove_stopwords
from gensim.parsing.preprocessing import strip_punctuation
import re
from nltk.tokenize import sent_tokenize, word_tokenize
import warnings
import string 
import gensim
from gensim.models import Word2Vec
from sklearn.model_selection import train_test_split

import gensim.downloader as gd
wv_model = gd.load('glove-wiki-gigaword-50')

ted = open("ted.txt", "r", encoding='utf-8').read()
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

from tensorflow.keras.layers import Permute
from tensorflow.keras.layers import Flatten
from tensorflow.keras.layers import BatchNormalization

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

model.fit(X_train, y_train, epochs=100, batch_size=1000, validation_split=0.1)

test_string = "each other overwhelmed and, frankly, pissed me off.Now, I'm a documentary filmmaker, so after going through my pissed off stage and yelling at the television and radio, my next instinct was to make a movie. And what guided me in making this film was, how was this happening? How was it that the gay rights movement was being pitted against the civil rights movement? And this wasn't just an abstract question. I'm a beneficiary of both movements, so this was actually personal. But then something else happened after that election in 2008. The march towards gay equality accelerated at a pace that surprised and shocked everyone, and is still reshaping our laws and our policies, our institutions and our entire country. And so it started to become increasingly clear to me that this pitting of the two movements against each other actually didn't make sense, and that they were in fact much, much more interconnected, and that, in fact, some of the way that the gay rights movement has been able to make such incredible gains so quickly is that used some of the same tactics and strategies that were first"

test_string = remove_stopwords(test_string)
test_string = test_string.split(' ')[-4:]
print(test_string)
test_vector = []
for word in test_string:
    test_vector.append(wv_model.key_to_index[word])
y_pred = model.predict(np.array([test_vector]))
print(wv_model.most_similar( y_pred, [], 10))
