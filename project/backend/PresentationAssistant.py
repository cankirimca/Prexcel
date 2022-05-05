from speech_to_text.SpeechToTextModel import SpeechToTextModel
from project.backend.database.UserDataManager import UserDataManager
from project.backend.face_detection.FaceDetection import FaceDetection
from project.backend.word_recommendation.WordRecommender import WordRecommender
from project.backend.speech_analysis.SpeechAnalyzer import SpeechAnalyzer
from project.backend.audio_volume.VolumeChecker import VolumeChecker
from threading import Thread
import time

class PresentationAssistant:

    def __init__(self, user_id, presentation_name):
        self.tokens = []
        self.words = [None]
        self.recommendations = []
        self.transcript = [None]
        self.stt = SpeechToTextModel(self.tokens, self.words, self.transcript)
        self.udm = UserDataManager()
        self.fd = FaceDetection()
        self.sa = SpeechAnalyzer()
        self.vc = VolumeChecker()   
        self.wr = WordRecommender(self.words, self.recommendations)   
        self.stt_exit = [False]
        self.fd_exit = [False]
        self.vc_exit = [False]
        self.wr_exit = [False]
        self.fd_period = 3
        self.fd_flags = []
        self.vc_db_list = []
        self.user_id = user_id
        self.presentation_name = presentation_name
        self.facial_orientation_score = 0
        self.stt_thread = Thread(target = self.initiate_speech_to_text)
        self.fd_thread = Thread(target = self.initiate_face_detection)
        self.vc_thread = Thread(target = self.initiate_volume_checker)
        self.wr_thread = Thread(target = self.initiate_word_recommender)
        print("pa created")

    def initiate_speech_to_text(self):
        self.stt_exit[0] = False
        print(11)
        self.stt.transcribe_live(self.stt_exit)
        print("speech to text terminated")

    def initiate_face_detection(self):
        self.fd_exit[0] = False
        print(22)
        self.facial_orientation_score = self.fd.detect_face( self.fd_flags, self.fd_exit)
        print("face detection terminated")


    def initiate_volume_checker(self):
        self.vc_exit[0] = False
        print(33)
        self.vc.check_volume(self.vc_db_list, self.vc_exit)
        print(" volume checker terminated")

    def initiate_word_recommender(self):
        self.wr_exit[0] = False
        self.wr.check_recommendations(self.wr_exit)
        print("word recom terminated")


    def end_presentation(self):
        try:
            print("presentation ended")
            self.stt_exit[0] = True   
            self.fd_exit[0] = True
            self.vc_exit[0] = True
            self.wr_exit[0] = True
            self.stt_thread.join()
            self.fd_thread.join()
            self.vc_thread.join()
            self.wr_thread.join()
            transcript, word_count, duration, wpm, gap_ratio, filler_ratio, dragged_ratio, repeated_ratio = self.sa.analyzed_tokens(self.tokens)
            fd_score = 0
            for flag in self.fd_flags:
                if flag == "+":
                    fd_score += 1
            if self.fd_flags == None or len(self.fd_flags):
                fd_score = 0   
            else:          
                fd_score = fd_score/len(self.fd_flags)   
            score = ((1-(filler_ratio)*3)+(1-(gap_ratio)*3) + (fd_score) + (1-(repeated_ratio)*3)+ (1-(dragged_ratio)*3))/5
            self.udm.add_presentation(self.presentation_name, transcript, self.user_id, wpm, duration, gap_ratio, filler_ratio, word_count, fd_score, score, dragged_ratio, repeated_ratio)  
            self.tokens.clear()
            self.words = [None]
            self.recommendations = [None]
            print("presentation added")
        except Exception as e:
            print(str(e))

    def initiate_presentation(self):
        self.stt_thread.start()
        self.fd_thread.start()
        self.vc_thread.start()
        self.wr_thread.start()


