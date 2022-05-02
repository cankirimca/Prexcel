import unittest
from project.backend.speech_to_text.SpeechToTextModel import SpeechToTextModel


class SpeechToTextTestCases(unittest.TestCase):
    def test_speech_to_text(self):

        words = [None]
        st = SpeechToTextModel([], words)
        st.transcribe_live([False])

        # check the live speech with the output, no other testing method



if __name__ == '__main__':
    unittest.main()
