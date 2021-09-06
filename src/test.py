from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import face_recognition

import argparse
import collections
import pickle
import time
from face_detect import FaceDetector
import cv2
from src import facenet
import imutils
import numpy as np
import tensorflow as tf
tf = tf.compat.v1
tf.disable_v2_behavior()
from imutils.video import VideoStream
from src.align_dataset_mtcnn import resize_image
from ApiHandler import getToken



def main():
    # parser = argparse.ArgumentParser()
    # parser.add_argument('--path', help='Path of the video you want to test on.', default=0)
    # args = parser.parse_args()
    NAME = {'quan': 1,
            'quan2': 2,
            'quang': 3,
            'quy': 4}
    MINSIZE = 20
    THRESHOLD = [0.6, 0.7, 0.7]
    FACTOR = 0.709
    IMAGE_SIZE = 182
    INPUT_IMAGE_SIZE = 160
    CLASSIFIER_PATH = '/home/quan/PycharmProjects/Face_recog/Models/facemodel_3.pkl'
    # VIDEO_PATH = args.path
    FACENET_MODEL_PATH = '/home/quan/PycharmProjects/Face_recog/Models/my_facenet.tflite'

    # Load The Custom Classifier
    with open(CLASSIFIER_PATH, 'rb') as file:
        model, class_names = pickle.load(file)
    print("Custom Classifier, Successfully loaded")

    with tf.Graph().as_default():

        gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.6)
        sess = tf.Session(config=tf.ConfigProto(gpu_options=gpu_options, log_device_placement=False))

        with sess.as_default():

            # Load the model
            print('Loading feature extraction model')
            # facenet.load_model(FACENET_MODEL_PATH)
            sess = facenet.TensorflowLiteClassificationModel(FACENET_MODEL_PATH)
            # # Get input and output tensors
            # images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
            # embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
            # phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
            # embedding_size = embeddings.get_shape()[1]

            # pnet, rnet, onet = align.detect_face.create_mtcnn(sess, "src/align")
            detector = FaceDetector()
            person_detected = collections.Counter()

            cap = VideoStream(src=0).start()
            pTime = 0


            while (True):
                frame = cap.read()

                frame = cv2.flip(frame, 1)
                img, bounding_boxes = detector.findFaces(frame)
                cTime = time.time()
                fps = 1 / (cTime - pTime)

                faces_found = len(bounding_boxes)

                if faces_found > 1:
                    cv2.putText(frame, "Only one face", (0, 100), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                1, (255, 255, 255), thickness=1, lineType=2)
                else :
                    det = bounding_boxes
                    bb = np.zeros((faces_found, 4), dtype=np.int32)
                    for i in range(faces_found):


                        bb[i][:] = det[i][1][:]

                        cv2.rectangle(frame, (bb[i][0] , bb[i][1], bb[i][2] , bb[i][3]), (0, 255, 0), 2)

                        cropped = frame[bb[i][1] - 80: bb[i][1]+bb[i][2] + 10, bb[i][0] - 20: bb[i][0]+ bb[i][3] + 20]

                        scaled = resize_image(cropped, (INPUT_IMAGE_SIZE, INPUT_IMAGE_SIZE))


                        scaled = facenet.prewhiten(scaled)
                        scaled_reshape = np.asarray(scaled.reshape(-1, INPUT_IMAGE_SIZE, INPUT_IMAGE_SIZE, 3), dtype=np.uint8)

                        emb_array = sess.run(scaled_reshape)
                        predictions = model.predict_proba(emb_array)

                        best_class_indices = np.argmax(predictions, axis=1)
                        best_class_probabilities = predictions[
                            np.arange(len(best_class_indices)), best_class_indices]
                        best_name = class_names[best_class_indices[0]]
                        pTime = cTime

                        print("Name: {}, Probability: {}".format(best_name, best_class_probabilities))

                        if best_class_probabilities > 0.7:

                            text_x = bb[i][0]
                            text_y = bb[i][1] - 20

                            name = class_names[best_class_indices[0]]
                            # id = NAME[name]
                            # getToken(id=id)

                            cv2.putText(img, f'FPS: {int(fps)}', (bb[i][0], bb[i][1] - 40), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                        1, (255, 255, 255), thickness=1, lineType=2)
                            cv2.putText(frame, str(name), (text_x, text_y), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                        1, (255, 255, 255), thickness=1, lineType=2)
                            cv2.putText(frame, str(round(best_class_probabilities[0], 3)), (text_x, text_y + 17),
                                        cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                        1, (255, 255, 255), thickness=1, lineType=2)
                            person_detected[best_name] += 1
                        else:
                            name = "Unknown"


                cv2.imshow('Face Recognition', frame)
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()



def main_():
    # parser = argparse.ArgumentParser()
    # parser.add_argument('--path', help='Path of the video you want to test on.', default=0)
    # args = parser.parse_args()
    NAME = {'quan': 1,
            'quan2': 2,
            'quang': 3,
            'quy': 4,
            'thien': 5}

    INPUT_IMAGE_SIZE = 160
    CLASSIFIER_PATH = '/home/quan/PycharmProjects/Face_recog/Models/facemodel_4.pkl'
    # VIDEO_PATH = args.path
    FACENET_MODEL_PATH = '/home/quan/PycharmProjects/Face_recog/Models/20180402-114759.pb'

    # Load The Custom Classifier
    with open(CLASSIFIER_PATH, 'rb') as file:
        model, class_names = pickle.load(file)
    print("Custom Classifier, Successfully loaded")

    with tf.Graph().as_default():

        gpu_options = tf.GPUOptions(per_process_gpu_memory_fraction=0.6)
        sess = tf.Session(config=tf.ConfigProto(gpu_options=gpu_options, log_device_placement=False))

        with sess.as_default():

            # Load the model
            facenet.load_model(FACENET_MODEL_PATH)
            # # Get input and output tensors
            images_placeholder = tf.get_default_graph().get_tensor_by_name("input:0")
            embeddings = tf.get_default_graph().get_tensor_by_name("embeddings:0")
            phase_train_placeholder = tf.get_default_graph().get_tensor_by_name("phase_train:0")
            embedding_size = embeddings.get_shape()[1]
            print(embedding_size)
            detector = FaceDetector()
            person_detected = collections.Counter()

            cap = cv2.VideoCapture(0)
            pTime = 0


            while (True):
                s,frame = cap.read()
                if s is False:
                    break
                frame = cv2.flip(frame, 1)
                img, bounding_boxes = detector.findFaces(frame)
                cTime = time.time()
                fps = 1 / (cTime - pTime)

                faces_found = len(bounding_boxes)

                if faces_found > 1:
                    cv2.putText(frame, "Only one face", (0, 100), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                1, (255, 255, 255), thickness=1, lineType=2)
                else :
                    det = bounding_boxes
                    bb = np.zeros((faces_found, 4), dtype=np.int32)
                    for i in range(faces_found):


                        bb[i][:] = det[i][1][:]

                        cv2.rectangle(frame, (bb[i][0] , bb[i][1], bb[i][2] , bb[i][3]), (0, 255, 0), 2)

                        cropped = frame[bb[i][1] - 80: bb[i][1]+bb[i][2] + 10, bb[i][0] - 20: bb[i][0]+ bb[i][3] + 20]

                        scaled = cv2.resize(cropped, (INPUT_IMAGE_SIZE, INPUT_IMAGE_SIZE), cv2.INTER_CUBIC)


                        # scaled = facenet.prewhiten(scaled)
                        test = scaled.reshape(INPUT_IMAGE_SIZE, INPUT_IMAGE_SIZE, 3)
                        scaled = scaled.reshape(-1, INPUT_IMAGE_SIZE, INPUT_IMAGE_SIZE, 3)
                        scaled_reshape = np.asarray(scaled, dtype=np.uint8)
                        print(scaled_reshape.shape)
                        feed_dict = {images_placeholder: scaled_reshape, phase_train_placeholder: False}
                        emb_array = sess.run(embeddings, feed_dict=feed_dict)
                        predictions = model.predict_proba(emb_array)

                        best_class_indices = np.argmax(predictions, axis=1)
                        best_class_probabilities = predictions[
                            np.arange(len(best_class_indices)), best_class_indices]
                        best_name = class_names[best_class_indices[0]]
                        pTime = cTime

                        print("Name: {}, Probability: {}".format(best_name, best_class_probabilities))

                        if best_class_probabilities > 0.7:

                            text_x = bb[i][0]
                            text_y = bb[i][1] - 20

                            name = class_names[best_class_indices[0]]
                            # id = NAME[name]
                            # getToken(id=id)

                            cv2.putText(frame, f'FPS: {int(fps)}', (bb[i][0], bb[i][1] - 40), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                        1, (255, 255, 255), thickness=1, lineType=2)
                            cv2.putText(frame, str(name), (text_x, text_y), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                        1, (255, 255, 255), thickness=1, lineType=2)
                            cv2.putText(frame, str(round(best_class_probabilities[0], 3)), (text_x, text_y + 17),
                                        cv2.FONT_HERSHEY_COMPLEX_SMALL,
                                        1, (255, 255, 255), thickness=1, lineType=2)
                            person_detected[best_name] += 1
                        else:
                            name = "Unknown"


                cv2.imshow('Face Recognition', test)
                if cv2.waitKey(10) & 0xFF == ord('q'):
                    break

            cap.release()
            cv2.destroyAllWindows()



main_()

