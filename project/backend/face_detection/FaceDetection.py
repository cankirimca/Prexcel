import cv2
import os
import threading
import time

class FaceDetection:
    def __init__(self):
        """
        Initialize the variables.
        """
        self.cascade_algorithm_path = os.path.dirname(cv2.__file__) + "/data/haarcascade_frontalface_default.xml"
        self.faceCascade = cv2.CascadeClassifier(self.cascade_algorithm_path)
        self.face_detection_flag = False
        self.face_detected_duration = 0
        self.face_not_detected_duration = 0


    def detect_face(self, flags, stop_flag):
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
                face_detection_flag = "-"
                self.face_not_detected_duration += 1
            else:
                print("Face is detected!")
                face_detection_flag = "+"
                self.face_detected_duration += 1

            #for (x, y, w, h) in faces:
                #cv2.rectangle(frames, (x, y), (x+w, y+h), (0, 255, 0), 2)

            #cv2.imshow('Video', frames)
            flags.append(face_detection_flag)
            if stop_flag[0]:
                break
            time.sleep(1)

        video_capture.release()
        cv2.destroyAllWindows()
        return (self.face_detected_duration / (self.face_detected_duration + self.face_not_detected_duration))


    def detect_face_from_file(self, file_name, flags):
        """
                Function to detect the presenters face from a mp4 file.

                Keyword Arguments:
                file_name -- an mp4 file from which the face detection algorithm will detect faces from

                Returns:
                face_detection_flag -- the flag to be returned
                """

        video_capture = cv2.VideoCapture(file_name)

        while True:
            ret, frames = video_capture.read()
            gray = cv2.cvtColor(frames, cv2.COLOR_BGR2GRAY)
            faces = self.faceCascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)

            if len(faces) == 0:
                print("Cannot detect face!")
                face_detection_flag = "-"
                self.face_not_detected_duration += 1

            else:
                print("Face is detected!")
                face_detection_flag = "+"
                self.face_detected_duration += 1


            # for (x, y, w, h) in faces:
            # cv2.rectangle(frames, (x, y), (x+w, y+h), (0, 255, 0), 2)

            # cv2.imshow('Video', frames)
            flags.append(face_detection_flag)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

        time.sleep(1)

        video_capture.release()
        cv2.destroyAllWindows()

        return (self.face_detected_duration / (self.face_detected_duration + self.face_not_detected_duration))





