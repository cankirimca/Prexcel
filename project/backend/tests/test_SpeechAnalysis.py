import unittest
from project.backend.speech_analysis.SpeechAnalyzer import SpeechAnalyzer
from collections import namedtuple
from recordclass import *


'''
contents of the file tested for this unit test to reproduce results

e 27
v 29
e 30
r 32
y 35
o 46
n 48
e 49
  69
t 75
o 77
  82
d 85
a 87
y 89
  95
i 100
  102
a 104
m 105
  108
g 111
o 112
i 114
n 116
g 117
  120
t 123
o 125
  129
t 132
a 135
l 137
k 138
  143
a 148
b 153
o 156
u 157
t 158
  166
d 173
y 176
n 181
a 184
m 185
i 189
c 191
  198
p 202
r 203
o 206
g 210
r 212
a 214
m 216
m 218
i 222
n 223
g 224
  226
a 234
p 237
p 241
r 242
o 247
a 250
c 254
h 255
  305
i 312
t 313
' 314
s 316
  318
a 324
  328
c 330
o 333
n 336
c 341
e 344
p 346
t 348
  354
c 361
o 363
m 364
m 367
o 370
n 372
l 378
y 381
  385
u 391
s 394
e 395
d 397
  403
b 409
y 414
  436
m 444
a 446
n 449
y 456
  467
p 472
r 473
o 476
g 481
r 483
a 486
m 489
m 493
e 499
r 501
s 506
  532
t 535
h 536
r 537
o 539
u 540
g 541
h 542
o 550
u 551
t 552
  558
t 560
h 561
e 562
  564
e 567
n 569
t 574
i 578
r 582
e 583
  587
w 591
o 593
r 595
l 601
d 604
  632
a 638
n 639
d 640
  643
i 647
s 651
  655
a 661
l 663
s 669
o 672
  677
v 683
e 685
r 687
y 690
  694
u 701
s 703
e 704
f 711
u 714
l 715
  747
c 757
o 760
n 763
c 768
e 772
p 774
t 777
  782
t 785
o 788
  794
u 801
s 804
e 805
  813
w 820
h 821
e 823
n 826
  847
d 851
e 853
a 856
l 858
i 864
n 865
g 866
  871
w 874
i 877
t 879
h 880
  931
d 934
e 936
n 939
o 944
m 947
i 952
n 954
a 975
t 997
i 1028
o 1053
n 1072
s 1078

'''

# duration = 21.56 wpm = 1.6697588126159555 gap_ratio = 807.0500927643785
class SpeechAnalyzerTestCase(unittest.TestCase):
    def test_Speech_Analyzer(self):
        token = namedtuple("token", "text timestep")

        sa = SpeechAnalyzer()
        # change the absolute path when necessary
        f = open("absolute path of the file to be tested with", "r")
        read = f.readlines()
        tokens = []

        for line in read:
            line2 = line.split()
            if len(line2) == 2:
                tokens.append(token(line2[0], int(line2[1])))
            elif len(line2) == 1:
                tokens.append(token(" ", int(line2[0])))
                # print(tokens)

        consolidated, word_count, duration_in_20_ms, total_gaps = sa.consolidate_tokens(tokens)
        duration_sec = duration_in_20_ms / 50
        wpm = word_count / duration_sec
        gap_ratio = (total_gaps / duration_sec) * 100

        print("result: ", duration_sec, wpm, gap_ratio)

        self.assertEqual(21.56, duration_sec)
        self.assertEqual(1.6697588126159555, wpm)
        self.assertEqual(807.0500927643785, gap_ratio)


if __name__ == '__main__':
    unittest.main()
