import numpy as np
import tensorflow as tf
import tf_slim as slim
import facenet
import pickle
import numpy
import classifier
import math
tf = tf.compat.v1
tf.disable_v2_behavior()
NAME = {'quan': 1,
        'quan2': 2,
        'quang': 3,
        'quy': 4,
        'thien': 5}
rng = np.random.RandomState(23455)
dataset_tmp = facenet.get_dataset('/home/quan/PycharmProjects/Face_recog/Dataset/FaceData/processed')
# train_set, test_set = classifier.split_dataset(dataset_tmp, 20, 200)

paths_train, labels_train = facenet.get_image_paths_and_labels(dataset_tmp)

rng.shuffle(paths_train)
rng.shuffle(labels_train)


paths_test, labels_test = paths_train[700:],  labels_train[700:]
paths_train, labels_train = paths_train[:700],  labels_train[:700]


images_test = facenet.load_data(paths_test, False, False, 160)
x_test = np.array(images_test, dtype=np.uint8)


print('Calculating features for images: ', len(paths_train))
train_num = len(paths_train)
batch_size = 32
steps_per_epoch = train_num // batch_size
idx_train = 0
idx_test = 0
step = 0
epochs = 100


print(type(labels_test[0]))


#
#

#
#
#
#
#
#
global_step = tf.Variable(0, trainable=False, name='gs1')



with tf.Graph().as_default():
    gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.7, allow_growth=True)
    with tf.Session(config=tf.ConfigProto(gpu_options=gpu_options, log_device_placement=False)) as sess:
        sess.run(tf.global_variables_initializer())
        facenet.load_model('/home/quan/PycharmProjects/Face_recog/Models/TF_2/')
        all_placeholders = [placeholder for op in tf.get_default_graph().get_operations() if op.type == 'Placeholder'
                            for placeholder in op.values()]
        print(all_placeholders)
        # phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
        # label = tf.placeholder(tf.int32, shape=[None, ])
        # images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
        # embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
        # flatten = slim.flatten(embeddings, scope='flatten')
        # fc1 = slim.fully_connected(embeddings, num_outputs=1024, activation_fn=tf.nn.swish, scope='fc1')
        # output = slim.fully_connected(fc1, num_outputs=5, activation_fn=tf.nn.softmax, scope='output')
        #
        #
        # cross_entropy = tf.reduce_mean(tf.nn.sparse_softmax_cross_entropy_with_logits(labels=label, logits=output))
        #
        # train_step = tf.train.RMSPropOptimizer(learning_rate=1e-4).minimize(cross_entropy, global_step)
        #
        # correct_prediction = tf.equal(tf.argmax(output, axis=0), tf.argmax(label, axis=0))
        # accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32)) * 100
        #
        # for itrain in range(steps_per_epoch * epochs):
        #     paths_batch = paths_train[idx_train:idx_train + batch_size]
        #     labels = labels_train[idx_train:idx_train + batch_size]
        #     images = facenet.load_data(paths_batch, False, False, 160)
        #     x_train = np.array(images, dtype=np.uint8)
        #     feed_dict = {images_placeholder: x_train,label:labels, phase_train_placeholder: False }
        #     _, step = sess.run([train_step, global_step], feed_dict=feed_dict)
        #     idx_train = (idx_train + batch_size) % train_num
        #     if (idx_train + batch_size) >= train_num:
        #         idx_train = idx_train + batch_size - train_num
        #
        #     if itrain % steps_per_epoch == 0:
        #         summary, acc, loss, = sess.run([ accuracy, cross_entropy], feed_dict={images_placeholder:x_test, label:labels_test, phase_train_placeholder:False})
        #
        #         print(f'acc: {acc} , loss: {loss}')


#%%
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
    fc2 = layers.Dense(512, activation='relu')(fc1)
    output = layers.Dense(5, activation='softmax')(fc2)
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

trainY = np.array(trainY)
testY = np.array(testY)
#%%

model = classifier()
model.compile(loss='sparse_categorical_crossentropy',
              optimizer='adam',
              metrics=['accuracy'])


lrr = ReduceLROnPlateau(monitor='val_accuracy',patience=2,factor=0.2, min_lr=0.0001)

history = model.fit(trainX,trainY, validation_data=(testX, testY), batch_size=32, callbacks=[lrr], epochs=100)
# model.save('/home/quan/PycharmProjects/Face_recog/Models/facemodel', save_format='tf')

#%%
import matplotlib.pyplot as plt
fig , ax = plt.subplots(1,2)
train_acc = history.history['accuracy']
train_loss = history.history['loss']
fig.set_size_inches(15,6)

ax[0].plot(history.history['accuracy'])
ax[0].plot(history.history['val_accuracy'])
ax[0].set_title('Training Accuracy vs Validation Accuracy')
ax[0].set_ylabel('Accuracy')
ax[0].set_xlabel('Epoch')
ax[0].legend(['Train', 'Validation'], loc='upper left')

ax[1].plot(history.history['loss'])
ax[1].plot(history.history['val_loss'])
ax[1].set_title('Training Loss vs Validation Loss')
ax[1].set_ylabel('Loss')
ax[1].set_xlabel('Epoch')
ax[1].legend(['Train', 'Validation'], loc='upper left')
plt.show()
plt.savefig('classifier.png')







