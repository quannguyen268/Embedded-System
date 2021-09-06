from __future__ import absolute_import
from __future__ import division
from __future__ import print_function

from typing import Tuple

import face_recognition
from PIL import ImageFont, ImageDraw, Image
import csv
import collections
import time
from face_detect import FaceDetector
import cv2

import numpy as np
import tensorflow as tf

tf = tf.compat.v1
tf.disable_v2_behavior()

from datetime import datetime


def image_writeText(frame, coordinate: Tuple[int, int], text=None, fontPath=None, fill=(255, 255, 255, 0), size=21,
                    spacing=5):
    font = ImageFont.truetype(fontPath, size)
    frame = Image.fromarray(frame)
    draw = ImageDraw.Draw(frame)

    draw.text(coordinate, str(text), font=font, fill=fill, spacing=spacing)
    frame = np.array(frame)
    return frame


def main():
    NAME = {'NGUYỄN VĂN QUÂN': 0,
            'TRẦN HỒNG QUÂN': 1,
            'VŨ MINH QUANG': 2,
            'NGUYỄN ĐỨC QUÝ': 3,
            'PHẠM NGỌC THIỆN': 4}
    INV_NAME = {v: k for k, v in NAME.items()}

    fontpath = "/home/quan/PycharmProjects/Face_recog/Roboto-Medium.ttf"
    fontpath_L = "/home/quan/PycharmProjects/Face_recog/Roboto-Light.ttf"
    CLASSIFIER_PATH = '/home/quan/PycharmProjects/Face_recog/Models/facemodel'

    model = tf.keras.models.load_model(CLASSIFIER_PATH)

    detector = FaceDetector()

    cap = cv2.VideoCapture(0)
    pTime = 0
    frame_count = 0

    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))

    size = (frame_width, frame_height)
    writer_vid = cv2.VideoWriter('final_vid.mp4',
                                 cv2.VideoWriter_fourcc(*'mp4v'),
                                 30, size)
    fieldnames = ['FRAME_COUNT', 'ACCURACY']

    with open('final_task.csv', 'w', encoding='UTF8', newline='\n') as f:
        writer_csv = csv.DictWriter(f, fieldnames=fieldnames)
        writer_csv.writeheader()

        while (True):

            suc, frame = cap.read()
            if suc is False:
                break
            now = datetime.now()
            dt_string = now.strftime("%d/%m/%Y %H:%M:%S")

            cTime = time.time()
            fps = 1 / (cTime - pTime)

            frame = cv2.flip(frame, 1)
            cv2.putText(frame, dt_string, (10, 20), cv2.FONT_HERSHEY_COMPLEX_SMALL,
                        1, (255, 255, 255), thickness=1, lineType=2)
            img, bounding_boxes = detector.findFaces(frame)
            rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

            faces_found = len(bounding_boxes)

            try:
                if faces_found > 1:
                    frame = image_writeText(frame, (0, 100), "Chỉ 1 người được đứng trước camera", fontPath=fontpath_L,
                                            fill=(255, 255, 255, 0), spacing=5)

                else:

                    bounding_boxes = bounding_boxes[0][1]
                    boxes = (bounding_boxes[0], bounding_boxes[1], bounding_boxes[0] + bounding_boxes[2],
                             bounding_boxes[1] + bounding_boxes[3])
                    boxes = [(boxes[1] - 30, boxes[2] + 15, boxes[3], boxes[0] - 15)]

                    cv2.rectangle(frame, (boxes[0][1], boxes[0][2]), (boxes[0][3], boxes[0][0]), (0, 255, 0), 2)
                    encodings = face_recognition.face_encodings(rgb, boxes)
                    encodings = np.array(encodings).reshape(-1, 128)

                    predictions = model.predict(encodings)

                    best_class_indices = np.argmax(predictions, axis=1)
                    best_class_probabilities = predictions[np.arange(len(best_class_indices)), best_class_indices]

                    best_name = INV_NAME[best_class_indices[0]]
                    pTime = cTime

                    # print("Name: {}, Probability: {}, FPS: {}".format(best_name, best_class_probabilities, fps))

                    if best_class_probabilities > 0.85:

                        frame_count += 1
                        name = best_name

                        row = [{
                            'FRAME_COUNT': frame_count,
                            'ACCURACY': best_class_probabilities[0]
                        }]

                        writer_csv.writerows(row)
                        # id = NAME[name]
                        # getToken(id=id)

                        frame = image_writeText(frame, (size[1] - len(name) - 30, 5), str(name), fontPath=fontpath)




                    else:

                        name = "NGƯỜI LẠ !"

                        frame = image_writeText(frame, (size[1] + 50, 5), str(name), fontPath=fontpath)


            except:
                pass

            writer_vid.write(frame)

            cv2.imshow('Face Recognition', frame)
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()
    writer_vid.release()

    f.close()


main()
