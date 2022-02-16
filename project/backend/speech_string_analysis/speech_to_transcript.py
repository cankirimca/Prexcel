from collections import namedtuple
from recordclass import *

# Constants for determining time based tag insertion
# Note that: 1 timestep == 0.02 seconds

SPACE_CONST = 25
DRAG_CONST_PER_CHAR = 4
REPEAT_RANGE = 20
REPEAT_COUNT = 3

token = namedtuple("token", "text timestep start_time")
word = recordclass("word", "txt start_time end_time tags")
# Test token array
tokens = [
    token(text='h', timestep=0, start_time=0.0),
    token(text='e', timestep=1, start_time=0.01999),
    token(text='l', timestep=16, start_time=0.31999),
    token(text='l', timestep=18, start_time=0.35999),
    token(text='o', timestep=19, start_time=0.37999),
    token(text=' ', timestep=22, start_time=0.43999),
    token(text='e', timestep=24, start_time=0.47999),
    token(text='v', timestep=28, start_time=0.56000),
    token(text='e', timestep=29, start_time=0.57999),
    token(text='r', timestep=30, start_time=0.59999),
    token(text='y', timestep=31, start_time=0.62000),
    token(text='o', timestep=33, start_time=0.65999),
    token(text='n', timestep=40, start_time=0.79999),
    token(text='e', timestep=41, start_time=0.81999),
]
if __name__ == '__main__':
    fillers2d = []  # Handled dynamically in code
    # Create Fillers list from file
    fillers_file = open(r"fillers.txt", "r")
    fillers = fillers_file.readlines()
    fillers_file.close()
    for f in fillers:
        fillers[fillers.index(f)] = f.rstrip("\n")

    # Generate intermediate 2d array of words with start and finish times
    consolidated_tokens = []
    word_count = 0
    curr_word = ""
    start = 0.0
    for t in tokens:
        if tokens.index(t) == 0:
            curr_word = ""
            start = t.timestep
        elif t.text == " ":
            consolidated_tokens.append(word(txt=curr_word, start_time=start, end_time=t.timestep, tags=[]))
            curr_word = ""
            start = tokens[tokens.index(t) + 1].timestep
            word_count += 1
        elif tokens.index(t) == len(tokens) - 1:
            curr_word += t.text
            consolidated_tokens.append(word(txt=curr_word, start_time=start, end_time=t.timestep
                                                                                      + t.timestep - (tokens[tokens.index(t) - 1]).timestep, tags=[]))
            word_count += 1
            break

        if t.text != " ":
            curr_word += t.text

    # Generate 2d word array of filler phrases
    for f in fillers:
        fillers2d.append(fillers[fillers.index(f)].split())

    print(consolidated_tokens)

    # Space = {/space/}
    # Filler = {filler} word/words {filler/}
    # Repeat = {repeat} word {repeat/}
    # Dragged = {dragged} word {dragged/}

    temp_curr = 0
    for w in consolidated_tokens:
        curr_index = consolidated_tokens.index(w)
        # Not at the end of the list
        if curr_index != len(consolidated_tokens) - 1 and consolidated_tokens[curr_index].end_time > 0:
            # Insert repeat tag
            rep_count = 0
            rep_indices = [curr_index]
            while temp_curr < REPEAT_RANGE and temp_curr + curr_index < len(consolidated_tokens) - 1:
                if consolidated_tokens[curr_index].txt == consolidated_tokens[curr_index + temp_curr + 1].txt:
                    rep_count += 1
                    rep_indices.append(curr_index + temp_curr + 1)

                temp_curr += 1

            if rep_count >= REPEAT_COUNT:
                for i in rep_indices:
                    # If does not already have repeat tag
                    if "r" not in consolidated_tokens[i].tags:
                        # Add "r" tag
                        consolidated_tokens[i].tags.append("r")

            # Insert dragged tag
            if consolidated_tokens[curr_index].end_time - consolidated_tokens[
                curr_index].start_time > DRAG_CONST_PER_CHAR * len(consolidated_tokens[curr_index].txt):
                # Add "d" tag
                consolidated_tokens[curr_index].tags.append("d")

            # Insert filler tag
            for row in fillers2d:
                # If the first word does not match, do nothing, else check whole phrase
                if consolidated_tokens[curr_index].txt == row[0]:
                    filler_word_count = len(row)
                    w_index = 0
                    phrase_match = True
                    while w_index < filler_word_count:
                        # Check if actual word, and not tag
                        if consolidated_tokens[curr_index + w_index].end_time > 0:
                            if consolidated_tokens[curr_index + w_index].txt != fillers2d[fillers2d.index(row)][w_index]:
                                phrase_match = False
                                break
                        w_index += 1

                    if phrase_match:
                        consolidated_tokens[curr_index].tags.append("fs")  # Filler start tag
                        consolidated_tokens[curr_index + w_index].tags.append("fe")  # Filler end tag

            # Insert space tag
            if consolidated_tokens[curr_index + 1].end_time > 0 and (
                    consolidated_tokens[curr_index + 1].start_time -
                    consolidated_tokens[
                        curr_index].end_time) > SPACE_CONST:
                consolidated_tokens.insert(curr_index + 1,
                                           word(txt="{/space/}", start_time=-1, end_time=-1, tags=[]))
    word_string_list = []
    result_string = ""

    for w in consolidated_tokens:
        word_string_list.append(str(w) + "\n")

    string_list_file = open(r"words_string_list.txt", "w")
    string_list_file.writelines(word_string_list)
    string_list_file.close()

    for w in consolidated_tokens:
        if "r" in w.tags:
            result_string += " {repeat} "
        if "d" in w.tags:
            result_string += " {dragged} "
        if "fs" in w.tags:
            result_string += " {filler} "

        if result_string[0] == " ":
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

    result_file = open(r"result.txt", "w")
    result_file.write(result_string)
    result_file.close()

    print(consolidated_tokens)