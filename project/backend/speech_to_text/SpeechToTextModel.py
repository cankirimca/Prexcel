from speech_to_text.VoiceDetectionManager import VoiceDetectionManager
#from VoiceDetectionManager import VoiceDetectionManager
from deepspeech import Model
import numpy as np
import os
import wave
import sys
import time
sys.path.append(".")

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

root = os.path.dirname(os.path.abspath(__file__))
pbmm_path = root + "\deepspeech-0.9.3-models.pbmm"
scorer_path = root + "\deepspeech-0.9.3-models.scorer"
beam_width = 1000
lm_alpha = 0.93
lm_beta = 1.18
DEFAULT_SAMPLE_RATE = 16000

def format_metadata_output(tokens, result_tokens):   
    f = open(root + "\output.txt","w+")
    if not tokens:
        return   
    for token in tokens:
        #f.write(token.text + " " + str(token.timestep) + "\n")
        result_tokens.append((token.text, str(token.timestep)))
 
class SpeechToTextModel:

    def __init__(self, tokens, words):
        self.model = Model(pbmm_path)
        self.result_tokens = tokens
        self.model.enableExternalScorer(scorer_path)
        self.model.setScorerAlphaBeta(lm_alpha, lm_beta)
        self.model.setBeamWidth(beam_width)
        self.stream = self.model.createStream()
        self.vdm = VoiceDetectionManager()
        self.words = words

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
        tokens = []
        while start < len(buffer):
            end = start + batch_size
            chunk = buffer[start:end]
            data16 = np.frombuffer(chunk, dtype = np.int16)
            self.stream.feedAudioContent(data16)
            x = self.stream.intermediateDecodeWithMetadata()
            if x.transcripts[0].tokens:
                tokens = x.transcripts[0].tokens
            start = end    
        format_metadata_output(tokens, self.result_tokens)
        print(x)

    def transcribe_live(self, stop_flag):
        ttime = time.time()
        x = None
        tokens = []
        frames = self.vdm.vad_collector(stop_flag)
        for frame in frames:
            if frame is not None:
                self.stream.feedAudioContent(np.frombuffer(frame, np.int16))
                x = self.stream.intermediateDecodeWithMetadata()
                y = self.stream.intermediateDecode()
                self.words[0] = y.split()
                #print(self.words[0])
                if x.transcripts[0].tokens:
                    tokens = x.transcripts[0].tokens
                    #print(len(self.words))
                    
                    #print(self.words)    
                #<class 'deepspeech.impl.Metadata'>       
        format_metadata_output(tokens, self.result_tokens)

    def get_tokens(self):
        return self.result_tokens

"""words = [None]
st = SpeechToTextModel([],words)
st.transcribe_stream("C:/Users/can/Downloads/new_temp_audio.wav")"""



