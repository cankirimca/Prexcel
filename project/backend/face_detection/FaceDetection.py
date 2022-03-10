import cv2
import os
import threading

class FaceDetection:
    def __init__(self):
        """
        Initialize the variables.
        """
        self.cascade_algorithm_path = os.path.dirname(cv2.__file__) + "/data/haarcascade_frontalface_default.xml"
        self.faceCascade = cv2.CascadeClassifier(self.cascade_algorithm_path)
        self.face_detection_flag = False


    def detect_face(self, frequency, flags):
        """
        Function to detect the presenters face.

        Keyword Arguments:
        video_capture -- openCV stream object that handles the incoming video capture.

        Returns:
        face_detection_flag -- the flag to be returned
        """
        video_capture = cv2.VideoCapture(0)

        while True:
            ret, frames = video_capture.read()
            gray = cv2.cvtColor(frames, cv2.COLOR_BGR2GRAY)
            faces = self.faceCascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)

            if len(faces) == 0:
                print("Cannot detect face!")
                face_detection_flag = False
            else:
                print("Face is detected!")
                face_detection_flag = True

            for (x, y, w, h) in faces:
                cv2.rectangle(frames, (x, y), (x+w, y+h), (0, 255, 0), 2)

            cv2.imshow('Video', frames)

            threading.Timer(frequency, self.detect_face).start()

            flags.append(face_detection_flag)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        video_capture.release()
        cv2.destroyAllWindows()




