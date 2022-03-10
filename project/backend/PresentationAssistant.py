from speech_to_text.SpeechToTextModel import SpeechToTextModel
from project.backend.database.UserDataManager import UserDataManager
from project.backend.face_detection.FaceDetection import FaceDetection
from threading import Thread

class PresentationAssistant:

    def __init__(self):
        self.stt = SpeechToTextModel()
        self.udm = UserDataManager()
        self.fd = FaceDetection()
        self.transcript = [""]
        self.stt_exit = [False]
        self.face_detection_exit = [False]
        self.frequency = 3
        self.face_detection_flag = False

    def initiate_speech_to_text(self):
        self.stt_exit[0] = False
        self.stt.transcribe_live(self.transcript, self.stt_exit)

    def initiate_face_detection(self):
        self.face_detection_exit[0] = False
        self.face_detection_flag = self.fd.face_detection_flag_freq(self.frequency)

    def end_presentation(self):
        print("presentation ended")
        self.stt_exit[0] = True   
        self.face_detection_exit[0] = False 

    def save_speech_data(self):
        #todo add real presentation data
        self.udm.add_presentation(123, 'asd', self.transcript[0], 21345)    

    def initiate_presentation(self):
        #create speech-to-text thread
        stt_thread = Thread(target = self.initiate_presentation, args =(lambda : self.stt_exit[0], ))
        face_detection_thread = Thread(target = self.initiate_presentation, args =(lambda : self.stt_exit[0], ))
        face_detection_thread.start()
        stt_thread.start()
