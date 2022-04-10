from speech_to_text.SpeechToTextModel import SpeechToTextModel
from project.backend.database.UserDataManager import UserDataManager
from project.backend.face_detection.FaceDetection import FaceDetection
from project.backend.speech_analysis.SpeechAnalyzer import SpeechAnalyzer


class PresentationAnalyzer:

    def __init__(self, user_id, presentation_name, file_path):
        self.tokens = []
        self.stt = SpeechToTextModel(self.tokens)
        self.fd = FaceDetection()
        self.fd_flags = []
        self.user_id = user_id
        self.presentation_name = presentation_name
        self.file_path = file_path
        

    def initiate_speech_analyzer(self):
        pass


    def initiate_face_detection(self):
        print("face detection module started.")

        self.fd.detect_face_from_file(self.presentation_file, self.fd_flags)

        print("face detection module finished.")

    def process_recording(self):
        self.stt.transcribe_stream(self.file_path)
        transcript, word_count, duration, wpm, gap_ratio, filler_ratio = self.sa.analyzed_tokens(self.tokens)
        self.udm.add_presentation(self.presentation_name, transcript, self.user_id, wpm, duration, gap_ratio, filler_ratio, word_count) 





























































































