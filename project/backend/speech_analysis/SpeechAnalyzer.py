from collections import namedtuple
from recordclass import *
import os
#from project.backend.database.UserDataManager import UserDataManager

# Constants for determining time based tag insertion
# Note that: 1 timestep == 0.02 seconds

SPACE_CONST = 25
DRAG_CONST_PER_CHAR = 4
REPEAT_RANGE = 20
REPEAT_COUNT = 3

token = namedtuple("token", "text timestep")
word = recordclass("word", "txt start_time end_time tags")


class SpeechAnalyzer:

    # Generate intermediate 2d array of words with start and finish times
    def consolidate_tokens(self, input_list):
        tokens = []
        for inp in input_list:
            tokens.append(token(text=inp[0], timestep=int(inp[1])))

        consolidated_tokens = []
        word_count = 0
        curr_word = ""
        start = 0
        end = 0
        total_gaps = 0
        for t in tokens:
            if tokens.index(t) == 0:
                curr_word = ""
                start = t.timestep
            elif t.text == " " and tokens.index(t) != len(tokens) - 1:
                consolidated_tokens.append(word(txt=curr_word, start_time=start, end_time=t.timestep, tags=[]))
                curr_word = ""
                print("index: ", tokens.index(t))
                start = tokens[tokens.index(t) + 1].timestep
                word_count += 1
                total_gaps += tokens[tokens.index(t) + 1].timestep - tokens[tokens.index(t)].timestep
            elif tokens.index(t) == len(tokens) - 1:
                curr_word += t.text
                consolidated_tokens.append(word(txt=curr_word, start_time=start, end_time=t.timestep
                                                                                          + t.timestep - (tokens[
                    tokens.index(t) - 1]).timestep, tags=[]))
                word_count += 1
                end = t.timestep
                break

            if t.text != " ":
                curr_word += t.text
        return consolidated_tokens, word_count, end, total_gaps

    # Use consolidated_tokens as input
    def tag_words(self, token_return_list):
        word_list = token_return_list
        fillers2d = []  # Handled dynamically in code
        # Create Fillers list from file
        fillers_file = open(r"project/backend/speech_analysis/fillers.txt", "r")
        fillers = fillers_file.readlines()
        fillers_file.close()
        # Generate 2d word array of filler phrases
        for f in fillers:
            fillers[fillers.index(f)] = f.rstrip("\n")
            fillers2d.append(fillers[fillers.index(f.rstrip("\n"))].split())

        # Space = {/space/}
        # Filler = {filler} word/words {filler/} - "f"
        # Repeat = {repeat} word {repeat/} - "r"
        # Dragged = {dragged} word {dragged/} - "d"

        filler_count = 0
        temp_curr = 0
        for w in word_list:
            curr_index = word_list.index(w)
            # Not at the end of the list
            if curr_index != len(word_list) - 1 and word_list[curr_index].end_time > 0:
                # Insert repeat tag
                rep_count = 0
                rep_indices = [curr_index]
                while temp_curr < REPEAT_RANGE and temp_curr + curr_index < len(word_list) - 1:
                    if word_list[curr_index].txt == word_list[curr_index + temp_curr + 1].txt:
                        rep_count += 1
                        rep_indices.append(curr_index + temp_curr + 1)

                    temp_curr += 1

                if rep_count >= REPEAT_COUNT:
                    for i in rep_indices:
                        # If does not already have repeat tag
                        if "r" not in word_list[i].tags:
                            # Add "r" tag
                            word_list[i].tags.append("r")

                # Insert dragged tag
                if word_list[curr_index].end_time - word_list[curr_index].start_time > DRAG_CONST_PER_CHAR * len(
                        word_list[curr_index].txt):
                    # Add "d" tag
                    word_list[curr_index].tags.append("d")

                # Insert filler tag
                for row in fillers2d:
                    # If the first word does not match, do nothing, else check whole phrase
                    if word_list[curr_index].txt == row[0]:
                        filler_word_count = len(row)
                        w_index = 0
                        phrase_match = True
                        while w_index < filler_word_count:
                            # Check if actual word, and not tag
                            if word_list[curr_index + w_index].end_time > 0:
                                if word_list[curr_index + w_index].txt != fillers2d[fillers2d.index(row)][w_index]:
                                    phrase_match = False
                                    break
                            w_index += 1

                        if phrase_match:
                            word_list[curr_index].tags.append("fs")  # Filler start tag
                            word_list[curr_index + w_index].tags.append("fe")  # Filler end tag
                            filler_count += 1

                # Insert space tag
                if word_list[curr_index + 1].end_time > 0 and (
                        word_list[curr_index + 1].start_time -
                        word_list[
                            curr_index].end_time) > SPACE_CONST:
                    word_list.insert(curr_index + 1,
                                     word(txt="{/space/}", start_time=-1, end_time=-1, tags=[]))

        word_string_list = []
        # Write tagged list to a file
        for w in word_list:
            word_string_list.append(str(w) + "\n")

        string_list_file = open(r"words_string_list.txt", "w")
        string_list_file.writelines(word_string_list)
        string_list_file.close()

        return word_list, filler_count

    def finalise_write_string(self, input_word_list):
        result_string = ""
        for w in input_word_list:
            if "r" in w.tags:
                result_string += " {repeat} "
            if "d" in w.tags:
                result_string += " {dragged} "
            if "fs" in w.tags:
                result_string += " {filler} "

            if result_string and result_string[0] == " ":
                result_string = result_string.replace(" ", "", 1)

            result_string += w.txt

            if "r" in w.tags:
                result_string += " {repeat/} "
            if "d" in w.tags:
                result_string += " {dragged/} "
            if "fe" in w.tags:
                result_string += " {filler/} "
            if len(w.tags) == 0:
                result_string += " "

        #result_file = open(r"result.txt", "w")
        #result_file.write(result_string)
        #result_file.close()
        return result_string

    #this function puts together all the functions to execute analysis of tokens
    def analyzed_tokens(self, input_tokens):
        consolidated, word_count, duration_in_20_ms, total_gaps = self.consolidate_tokens(input_tokens)
        duration_sec = duration_in_20_ms/50
        wpm = word_count/duration_sec
        gap_ratio = (total_gaps/duration_sec)*100
        tagged, filler_count = self.tag_words(consolidated)
        filler_ratio = filler_count/word_count
        return self.finalise_write_string(tagged), word_count, duration_sec, wpm, gap_ratio, filler_ratio

#the below code is used for the testing of this class
"""
#directory = os.getcwd()
#print(directory)

sa = SpeechAnalyzer()
f = open("project/backend/speech_analysis/sa.txt", "r")
read = f.readlines()
tokens = []

for line in read:
    line2 = line.split()
    if len(line2) == 2:
        tokens.append(token(line2[0], int(line2[1])))
    elif len(line2) == 1:
        tokens.append(token(" ", int(line2[0])) )   
#print(tokens)

consolidated, word_count, duration_in_20_ms, total_gaps = sa.consolidate_tokens(tokens)
duration_sec = duration_in_20_ms/50
wpm = word_count/duration_sec
gap_ratio = (total_gaps/duration_sec)*100
#print(c_tokens)
#print(type(tokens))
tagged = sa.tag_words(consolidated)
#print(tagged)
ws = sa.finalise_write_string(tagged)
print(ws)
print("result: ", duration_sec, wpm, gap_ratio)
"""