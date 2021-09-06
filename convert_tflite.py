import tensorflow as tf
import numpy as np
def load_graph(frozen_graph_filename):
    with tf.gfile.GFile(frozen_graph_filename, "rb") as f:
        graph_def = tf.GraphDef()
        graph_def.ParseFromString(f.read())

    with tf.Graph().as_default() as graph:
        tf.import_graph_def(graph_def, name="prefix")
    return graph





interpreter = tf.lite.Interpreter(model_path='/home/quan/PycharmProjects/Face_recog/Models/model.tflite')
interpreter.allocate_tensors()

# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

# Test model on random input data.
input_shape = input_details[0]['shape']
input_data = np.array(np.random.random_sample(input_shape), dtype=np.float32)
interpreter.set_tensor(input_details[0]['index'], input_data)

interpreter.invoke()

# The function `get_tensor()` returns a copy of the tensor data.
# Use `tensor()` in order to get a pointer to the tensor.
output_data = interpreter.get_tensor(output_details[0]['index'])
print(output_data)
#%%

if __name__ == '__main__':
    # graph = load_graph('/home/quan/PycharmProjects/MiAI_FaceRecog_2/Models/20180402-114759.pb')
    # for op in graph.get_operations():
    #     abc = graph.get_tensor_by_name(op.name + ":0")
    #     print(abc)

    # Convert the model
    converter = tf.lite.TFLiteConverter.from_saved_model('/home/quan/PycharmProjects/Face_recog/Models/facemodel')  # path to the SavedModel directory
    tflite_model = converter.convert()

    # Save the model.
    with open('/home/quan/PycharmProjects/Face_recog/Models/model.tflite', 'wb') as f:
        f.write(tflite_model)