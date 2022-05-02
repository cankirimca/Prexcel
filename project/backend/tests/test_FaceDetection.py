import unittest
from project.backend.face_detection.FaceDetection import FaceDetection


class FaceDetectionTest(unittest.TestCase):
    def test_face_detection_live(self):
        fd = FaceDetection()

        face_detection_flags = []
        stop_flags = [False, True]

        test_flag = False

        if fd.detect_face(face_detection_flags, stop_flags) > 0.0:
            test_flag = True


        self.assertTrue(test_flag)


    def test_face_detection_from_file(self):
        fd = FaceDetection()

        face_detection_flags = []
        test_file_name = "test.mp4"

        test_flag = False

        if fd.detect_face(test_file_name, face_detection_flags) > 0.0:
            test_flag = True


        self.assertTrue(test_flag)



if __name__ == '__main__':
    unittest.main()
