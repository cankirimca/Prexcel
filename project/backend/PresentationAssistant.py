from speech_to_text.SpeechToTextModel import SpeechToTextModel
from project.backend.database.UserDataManager import UserDataManager
from project.backend.face_detection.FaceDetection import FaceDetection
from project.backend.speech_analysis.SpeechAnalyzer import SpeechAnalyzer
from threading import Thread

class PresentationAssistant:

    def __init__(self):
        self.tokens = []
        self.stt = SpeechToTextModel(self.tokens)
        self.udm = UserDataManager()
        self.fd = FaceDetection()
        self.sa = SpeechAnalyzer()      
        self.stt_exit = [False]
        self.fd_exit = [False]
        self.fd_period = 3
        self.fd_flags = []

    def initiate_speech_to_text(self):
        self.stt_exit[0] = False
        self.stt.transcribe_live(self.stt_exit)
        print("speech to text terminated")

    def initiate_face_detection(self):
        self.fd_exit[0] = False
        self.fd.detect_face(self.fd_period, self.fd_flags, self.fd_exit)
        print("face detection terminated")

    def end_presentation(self):
        print("presentation ended")
        self.stt_exit[0] = True   
        self.fd_exit[0] = True
        #self.sa.execute_analysis(self.tokens)

    def save_speech_data(self):
        #todo add real presentation data
        self.udm.add_presentation(123, 'asd', self.transcript[0], 21345)    

    def initiate_presentation(self):
        #create speech-to-text thread
        self.initiate_speech_to_text()
        """stt_thread = Thread(target = self.initiate_speech_to_text)
        fd_thread = Thread(target = self.initiate_face_detection)
        stt_thread.start()
        fd_thread.start()"""
        