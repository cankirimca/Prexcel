import pyaudio
import time
import numpy as np
import struct
import math

class VolumeChecker():

    def __init__(self,device=None,startStreaming=True):

        self.chunk = 4096
        self.rate = 44100

        self.p=pyaudio.PyAudio()
        if startStreaming:
            self.stream_start()

    def stream_start(self):
        self.stream = self.p.open(format=pyaudio.paInt16, channels=1, rate=self.rate, input=True, frames_per_buffer=self.chunk)
        return self.stream

    def stream_stop(self):
        if 'stream' in locals():
            self.stream.stop_stream()
            self.stream.close()

    def close(self):
        self.stream_stop()
        self.p.terminate()

    def rms(self, data):
        count = len(data.read(self.chunk))/2
        format = "%dh"%(count)
        
        shorts = struct.unpack( format, data.read(self.chunk) )
        sum_squares = 0.0
        
        for sample in shorts:
            n = sample * (1.0/32768)
            sum_squares += n*n
        
        return math.sqrt( sum_squares / count )

    def convert_rms_to_decibel(self, rms):
        decibel = 20 * math.log10(rms)
        return decibel

    def check_volume():
        vc = VolumeChecker()
        s = vc.stream_start()


        
        #todo fix bug regarding creation of the dB list



        rms = vc.rms(s)
        db = vc.convert_rms_to_decibel(rms)

        # todo check this again using external dB measurement
        db = db + 70


        print(db)

        return db



















"""
if __name__=="__main__":
    vc = VolumeChecker()
    s = vc.stream_start()

    rms = vc.rms(s)
    print(vc.convert_rms_to_decibel(rms))


    vc.stream_stop()
    vc.close()


"""
