import collections
import logging
import queue

from deepspeech import Model
import deepspeech
import webrtcvad
import numpy as np
import os
import wave
import pyaudio
import time

from halo import Halo
from scipy import signal

pbmm_path = "deepspeech-0.9.3-models.pbmm"
scorer_path ="deepspeech-0.9.3-models.scorer"
beam_width = 1000
lm_alpha = 0.93
lm_beta = 1.18
input_rate = 16000

class VoiceDetectionManager(object):

    RATE_PROCESS = 16000
    CHANNELS = 1
    BLOCKS_PER_SECOND = 50
    input_rate = 16000

    def __init__(self):
        def callback(data):
            self.queue.put(data)

        def proxy_callback(in_data, frame_count, time_info, status):
            if self.chunk is not None:
                in_data = self.wf.readframes(self.chunk)
            callback(in_data)
            return None, pyaudio.paContinue

        self.block_size = int(self.RATE_PROCESS / float(self.BLOCKS_PER_SECOND))
        self.queue = queue.Queue()
        self.queue.queue.clear()
        self.sample_rate = self.RATE_PROCESS
        self.block_size_input = int(self.input_rate / float(self.BLOCKS_PER_SECOND))
        self.input_rate = input_rate
        self.vad = webrtcvad.Vad(3)
        self.pAudio = pyaudio.PyAudio()

        kwargs = {
            'format': pyaudio.paInt16,
            'channels': self.CHANNELS,
            'rate': self.input_rate,
            'input': True,
            'frames_per_buffer': self.block_size_input,
            'stream_callback': proxy_callback,
        }

        self.chunk = None
        self.stream = self.pAudio.open(**kwargs)
        self.stream.start_stream()

    def read(self):
        return self.queue.get()

    frame_duration_ms = property(lambda self: 1000 * self.block_size // self.sample_rate)

    def frame_generator(self, stop_flag):
        self.queue.queue.clear()
        if self.input_rate == self.RATE_PROCESS:
            while not stop_flag[0]:
                yield self.read()       

    def vad_collector(self, stop_flag):
        self.queue.queue.clear()
        frames = self.frame_generator(stop_flag)
        ring_buffer = collections.deque(maxlen=300 // self.frame_duration_ms)
        triggered = False

        for frame in frames:
            if len(frame) < 640 or stop_flag[0]:
                return

            is_speech = self.vad.is_speech(frame, self.sample_rate)

            if not triggered:
                ring_buffer.append((frame, is_speech))
                num_voiced = len([f for f, speech in ring_buffer if speech])
                if num_voiced > 0.75 * ring_buffer.maxlen:
                    triggered = True
                    #self.idle[0] = False
                    #print("spoke")
                    for f, s in ring_buffer:
                        yield f
                    ring_buffer.clear()

            else:
                yield frame
                ring_buffer.append((frame, is_speech))
                num_unvoiced = len([f for f, speech in ring_buffer if not speech])
                if num_unvoiced > 0.75 * ring_buffer.maxlen:
                    triggered = False
                    yield None
                    ring_buffer.clear()

print("Run VoiceDetectionManager")

