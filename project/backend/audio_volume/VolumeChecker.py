import pyaudio
import time
import numpy as np
import struct
import math

class VolumeChecker():

    def __init__(self, device=None, startStreaming=True):

        self.chunk = 4096
        self.rate = 44100

        self.p = pyaudio.PyAudio()
        if startStreaming:
            self.stream_start()

    def stream_start(self):
        self.stream = self.p.open(format = pyaudio.paInt16, channels = 1, rate=self.rate, input = True, frames_per_buffer = self.chunk)
        return self.stream

    def stream_read(self):
        data = np.fromstring(self.stream.read(self.chunk),dtype=np.int16)
        print(data)
        return data


    def stream_stop(self):
        if 'stream' in locals():
            self.stream.stop_stream()
            self.stream.close()

    def close(self):
        self.stream_stop()
        self.p.terminate()

    def rms(self, data):
        count = len(data.read(self.chunk))/2
        format = "%dh" % count
        
        shorts = struct.unpack(format, data.read(self.chunk))
        sum_squares = 0.0
        
        for sample in shorts:
            n = sample * (1.0/32768)
            sum_squares += n*n
        
        return math.sqrt(sum_squares / count)



    def convert_rms_to_decibel(self, rms):
        decibel = 20 * math.log10(rms)
        return decibel



    def check_volume(self, decibel_list, check_volume_stop_flag):
        vc = VolumeChecker()

        while True:
            s = vc.stream_start()
            rms = vc.rms(s)
            db = vc.convert_rms_to_decibel(rms)
            s.stop_stream()

            if check_volume_stop_flag[0]:
                break

            # todo check this again using external dB measurement
            db = db + 70
            decibel_list.append(db)

            #print(decibel_list)

        return decibel_list


if __name__ == '__main__':
    l = []
    f = [False]
    vc = VolumeChecker()
    vc.check_volume(l, f)
    




















    """
if __name__=="__main__":
    vc = VolumeChecker()
    s = vc.stream_start()


    '''
    vc.stream_read()

    while True:
        data = np.fromstring(s.read(1024), dtype=np.int16)

        print('data ---------- ', data)

    rms = vc.rms(s)
    print(vc.convert_rms_to_decibel(rms))
    '''

    vc.check_volume([False])

    vc.stream_stop()
    vc.close()





























































































































































    """