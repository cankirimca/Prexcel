
from deepspeech import Model
import numpy as np
import os
import wave
import sys
#sys.path.append(".")
from VoiceDetectionManager import VoiceDetectionManager
import time

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


pbmm_path = "deepspeech-0.9.3-models.pbmm"
scorer_path = "deepspeech-0.9.3-models.scorer"
beam_width = 1000
lm_alpha = 0.93
lm_beta = 1.18
DEFAULT_SAMPLE_RATE = 16000

def format_metadata_output(tokens):   
    if not tokens:
        return   
    new_word = False
    start_time = 0
    end_time = 0
    word = "" 
    words = []
    for token in tokens:
        if new_word:
            start_time = token.start_time
            new_word = False
        if token == tokens[len(tokens) - 1]:
            end_time = token.start_time
            word += token.text
            words.append((word, len(word), end_time - start_time)) 
            word = ""
            break
        if token.text != ' ':
            end_time = token.start_time
            word += token.text
            new_word = True
        else:
            words.append((word, len(word), end_time - start_time))
            word = ""    
        #add information of spoken word, and its length and duration    
        
    print(words)  
    f = open("output.txt","w+")     
        

class SpeechToTextModel:

    def __init__(self):
        self.model = Model(pbmm_path)
        self.model.enableExternalScorer(scorer_path)
        self.model.setScorerAlphaBeta(lm_alpha, lm_beta)
        self.model.setBeamWidth(beam_width)
        self.stream = self.model.createStream()
        self.vdm = VoiceDetectionManager()

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

    def transcribe_live(self, buffer, stop_flag):
        ttime = time.time()
        frames = self.vdm.vad_collector(stop_flag)
        for frame in frames:
            if frame is not None:
                # if spinner:
                #     spinner.start()
                self.stream.feedAudioContent(np.frombuffer(frame, np.int16))
                x = (self.stream.intermediateDecodeWithMetadata())
                tokens = x.transcripts[0].tokens
                #<class 'deepspeech.impl.Metadata'>
            if time.time() - ttime > 5:
                format_metadata_output(tokens)
                break

    
                      

stm = SpeechToTextModel()
buffer = [""]
x = stm.transcribe_live(buffer, False)
#print(x)
