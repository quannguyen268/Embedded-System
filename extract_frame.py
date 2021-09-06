# This is a sample Python script.

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.

import cv2

cap = cv2.VideoCapture('/home/quan/Downloads/thien.mp4')
count = 0
while True:
    s, frame = cap.read()
    if s is False:
        break
    name = 'thien' + str(count) + '.jpg'
    cv2.imwrite('/home/quan/PycharmProjects/Face_recog/Dataset/FaceData/test/thien/' + name, frame)
    count += 1
