# import the necessary packages
import face_recognition
import argparse
import pickle
import cv2
# construct the argument parser and parse the arguments
import numpy as np



from tensorflow.keras.models import Model
from tensorflow.keras import initializers, layers, losses, optimizers, activations
from tensorflow.keras.callbacks import ReduceLROnPlateau

def classifier():
    input = layers.Input(shape=(128,))
    fc1 = layers.Dense(units=512, activation='relu')(input)
    # fc2 = layers.Dense(512, activation='relu')(fc1)
    output = layers.Dense(5, activation='softmax')(fc1)
    model = Model(inputs=input, outputs=output, name='Classifier')
    return model





#%%
import numpy as np
from sklearn.model_selection import train_test_split
rng = np.random.RandomState(23455)

data = pickle.loads(open('/home/quan/PycharmProjects/Face_recog/Dataset/encodings.pickle', "rb").read())
Name = {'quan':0, 'quan2': 1, 'quang': 2, 'quy': 3, 'thien': 4}
embeds = np.array(data['encodings'])
label = [Name[n] for n in data['names']]

trainX, testX, trainY, testY = train_test_split(embeds, label, random_state=42, test_size=0.15, shuffle=True)



trainX.shape
#%%
model = classifier()
model.compile(loss='sparse_categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])


lrr = ReduceLROnPlateau(monitor='val_accuracy',patience=2,factor=0.2, min_lr=0.0001)

model.summary()
model.fit(trainX,trainY, validation_data=(testX, testY), batch_size=32, callbacks=[lrr], epochs=100)

#%%
import  numpy as np
model.save('/home/quan/PycharmProjects/Face_recog/Models/facemodel', save_format='tf')
#%%

NAME = {'quan': 1,
        'quan2': 2,
        'quang': 3,
        'quy': 4}
INV_NAME = {v: k for k, v in NAME.items()}

print(INV_NAME[1])