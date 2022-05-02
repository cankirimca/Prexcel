from speech_to_text.SpeechToTextModel import SpeechToTextModel
from project.backend.database.UserDataManager import UserDataManager
from project.backend.face_detection.FaceDetection import FaceDetection
from project.backend.speech_analysis.SpeechAnalyzer import SpeechAnalyzer

import os
import sys
from moviepy.editor import VideoFileClip
root = os.path.dirname(os.path.abspath(__file__))

class PresentationAnalyzer:

    def __init__(self, user_id, presentation_name, file_path):
        self.tokens = []
        self.words = [None]
        self.stt = SpeechToTextModel(self.tokens, self.words)
        self.fd = FaceDetection()
        self.fd_flags = []
        self.user_id = user_id
        self.presentation_name = presentation_name
        self.file_path = file_path
        self.sa = SpeechAnalyzer()
        self.udm = UserDataManager()

    def process_video_recording(self):
        self.convert_video_to_audio("wav")
        print("converted to audio")
        self.stt.transcribe_stream(root + "\\temp_audio.wav")
        print(self.tokens)
        print("transcribe complete")
        transcript, word_count, duration, wpm, gap_ratio, filler_ratio = self.sa.analyzed_tokens(self.tokens)
        print("analyzed tokens")

        print("face detection module started.")
        self.fd.detect_face_from_file(self.file_path, self.fd_flags)

        fd_score = 0
        for flag in self.fd_flags:
            if flag == "+":
                fd_score += 1
        fd_score = fd_score/len(self.fd_flags)   

        print("face detection module finished.")
        self.udm.add_presentation(self.presentation_name, transcript, self.user_id, wpm, duration, gap_ratio, filler_ratio, word_count, fd_score) 
        print("pushed to database")

    def process_recording(self):
        print("in process")
        print(self.file_path[-4])
        if not self.file_path:
            return 0
        if self.file_path[-4:] == ".wav":
            self.process_voice_recording()
            return 1 
        elif self.file_path[-4:] == ".mp4":    
            try:
                self.process_video_recording()
                return 1
            except:
                return 0    
        else:
            print("else")
            return 0

    def process_voice_recording(self):
        self.stt.transcribe_stream(self.file_path)
        transcript, word_count, duration, wpm, gap_ratio, filler_ratio = self.sa.analyzed_tokens(self.tokens)
        self.udm.add_presentation(self.presentation_name, transcript, self.user_id, wpm, duration, gap_ratio, filler_ratio, word_count, 0) 
        print("processing ended")  

    def convert_video_to_audio(self, output_extension):
        print("in convert")
        file_name, extension = os.path.splitext(self.file_path)
        clip = VideoFileClip(self.file_path)
        path = root + "\\temp_audio.wav"
        
        clip.audio.write_audiofile(path)
        print("convert ended")

