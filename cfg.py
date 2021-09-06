
import pickle

with open('/home/quan/PycharmProjects/Face_recog/Models/facemodel.pkl', 'rb') as file:
    model, class_names = pickle.load(file)

    print(class_names)