from speech_to_text.SpeechToTextModel import SpeechToTextModel
from database.UserDataManager import UserDataManager
from face_detection.FaceDetection import FaceDetection
from speech_analysis.SpeechAnalyzer import SpeechAnalyzer

import os
import sys
from moviepy.editor import VideoFileClip
from pydub import AudioSegment
root = os.path.dirname(os.path.abspath(__file__))

class PresentationAnalyzer:

    def __init__(self, user_id, presentation_name, file_path):
        self.tokens = []
        self.words = [None]
        self.transcript = [None]
        self.stt = SpeechToTextModel(self.tokens, self.words, self.transcript)
        self.fd = FaceDetection()
        self.fd_flags = []
        self.user_id = user_id
        self.presentation_name = presentation_name
        self.file_path = file_path
        self.sa = SpeechAnalyzer()
        self.udm = UserDataManager()

    def process_video_recording(self):
        print(1)
        self.convert_video_to_audio()
        print(2)
        self.stt.transcribe_stream(root + "\\temp_audio_mono.wav")
        print(3)
        transcript, word_count, duration, wpm, gap_ratio, filler_ratio, dragged_ratio, repeated_ratio = self.sa.analyzed_tokens(self.tokens)
        print(4)
        self.fd.detect_face_from_file(self.file_path, self.fd_flags)
        print(5)
        fd_score = 0

        for flag in self.fd_flags:
            if flag == "+":
                fd_score += 1
        print(6)
        if self.fd_flags == None or len(self.fd_flags) == 0:
            fd_score = 0   
        else:          
            fd_score = fd_score/len(self.fd_flags)  
        print(7)  
        print("fd score:", fd_score)
        score = ((1-(filler_ratio)*3)+(1-(gap_ratio)*3) + (fd_score) + (1-(repeated_ratio)*3)+ (1-(dragged_ratio)*3))/5
        print(score)
        print("face detection module finished.")
        self.udm.add_presentation(self.presentation_name, transcript, self.user_id, wpm, duration, gap_ratio, filler_ratio, word_count, fd_score, score, dragged_ratio, repeated_ratio) 
        print("pushed to database")

    def process_recording(self):
        print("in process")
        print(self.file_path[-4])
        if not self.file_path:
            return 0
        if self.file_path[-4:] == ".wav":
            try:
                self.process_voice_recording()
                return 1 
            except:
                return 0       
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
        sound = AudioSegment.from_wav(self.file_path)
        sound = sound.set_channels(1)
        sound = sound.set_frame_rate(16000)
        sound.export(root + "\\temp_audio_mono.wav" , format="wav")
        self.stt.transcribe_stream(root + "\\temp_audio_mono.wav")

        fd_score = 0 #for audio-only presentations
        transcript, word_count, duration, wpm, gap_ratio, filler_ratio, dragged_ratio, repeated_ratio = self.sa.analyzed_tokens(self.tokens)
        score = ((1-(filler_ratio)*3)+(1-(gap_ratio)*3) + (1-(repeated_ratio)*3)+ (1-(dragged_ratio)*3))/4
        self.udm.add_presentation(self.presentation_name, transcript, self.user_id, wpm, duration, gap_ratio, filler_ratio, word_count, fd_score, score, dragged_ratio, repeated_ratio) 

    def convert_video_to_audio(self):
        clip = VideoFileClip(self.file_path)
        path = root + "\\temp_audio_stereo.wav"       
        clip.audio.write_audiofile(path, fps=16000, codec='pcm_s16le')

        sound = AudioSegment.from_wav(root + "\\temp_audio_stereo.wav")
        sound = sound.set_channels(1)
        sound.export(root + "\\temp_audio_mono.wav" , format="wav")
        print("convert ended")

#pa = PresentationAnalyzer(12, "qwe", "C:/Users/can/Downloads/Kayıt (19).wav")
#pa = PresentationAnalyzer(12, "qwe", "C:/Users/can/Desktop/can.wav")
#pa.process_recording()
