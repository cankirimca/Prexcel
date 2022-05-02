import unittest
import sys
sys.path.insert(0, '..')

from project.backend.audio_volume.VolumeChecker import VolumeChecker


class test_VolumeChecker(unittest.TestCase):

    def test_check_decibel(self):
        vc = VolumeChecker()
        
        l = []
        f = [False, True]

        decibel_list = vc.check_volume(l, f)

        self.assertEqual(decibel_list[0], 20.24)


if __name__ == '__main__':
    unittest.main()