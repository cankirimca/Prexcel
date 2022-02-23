import cv2
import os
import threading


cascPath = os.path.dirname(cv2.__file__)+"/data/haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascPath)

face_detection_flag = False

video_capture = cv2.VideoCapture(0)
while True:
    ret, frames = video_capture.read()
    gray = cv2.cvtColor(frames, cv2.COLOR_BGR2GRAY)
    faces = faceCascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)

    if len(faces) == 0:
        print("Cannot detect face!")
        face_detection_flag = False
    else:
        print("Face is detected!")
        face_detection_flag = True

    for (x, y, w, h) in faces:
        cv2.rectangle(frames, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow('Video', frames)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
cv2.destroyAllWindows()

def face_detection_flag_freq():
    threading.Timer(5.0, face_detection_flag_freq).start()
    print(face_detection_flag)

