
from deepspeech import Model
import numpy as np
import os
import wave

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

pbmm_path = "deepspeech-0.9.3-models.pbmm"
scorer_path ="deepspeech-0.9.3-models.scorer"
beam_width = 1000
lm_alpha = 0.93
lm_beta = 1.18

class SpeechToTextModel:
    def __init__(self):
        self.model = Model(pbmm_path)
        self.model.enableExternalScorer(scorer_path)
        self.model.setScorerAlphaBeta(lm_alpha, lm_beta)
        self.model.setBeamWidth(beam_width)
        self.stream = self.model.createStream()

    def read_wav_file(self, filename):
        wf = wave.open(filename, 'rb')
        rate = wf.getframerate()
        frames = wf.getnframes()
        buffer = wf.readframes(frames)
        return buffer, rate

    def transcribe_file(self, filename):
        buffer, rate = self.read_wav_file(filename)
        data16 = np.frombuffer(buffer, dtype = np.int16)
        return self.model.stt(data16)

    def transcribe_stream(self, file_name):
        buffer, rate = self.read_wav_file(file_name)
        a = type(buffer)
        start = 0
        batch_size = 8196
        text = ''
        while start < len(buffer):
            end = start + batch_size
            chunk = buffer[start:end]
            data16 = np.frombuffer(chunk, dtype = np.int16)
            self.stream.feedAudioContent(data16)
            print(self.stream.intermediateDecode())
            start = end

    def transcribe_live(self, speech_data):
        data16 = np.frombuffer(speech_data, dtype=np.int16)
        return self.model.stt(data16)

stm = SpeechToTextModel()
x = stm.transcribe_stream("speech2.wav")
#print(x)
