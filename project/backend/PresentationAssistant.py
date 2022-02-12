from project.backend.speech_to_text.SpeechToTextModel import SpeechToTextModel
from project.backend.database.UserDataManager import UserDataManager
from threading import Thread

class PresentationAssistant:

    def __init__(self):
        self.stt = SpeechToTextModel()
        self.udm = UserDataManager()
        self.transcript = [""]
        self.stt_exit = False

    def initiate_voice_recording(self):
        self.stt_exit = False
        self.stt.transcribe_live(self.transcript)

    def stop_voice_recording(self):
        self.stt_exit = True    

    def save_speech_data(self):
        #todo add real presentation data
        self.udm.add_presentation(123, 'asd', self.transcript[0], 21345)    

    def initiate_system(self):
        #create speech-to-text thread
        stt_thread = Thread(target = self.initiate_voice_recording, args =(lambda : self.stt_exit, ))
        stt_thread.start()
