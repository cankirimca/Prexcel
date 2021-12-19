import argparse
import os
import torch
from pytorch_pretrained_bert import BertTokenizer, BertFoMaskedLM

PAD, MASK, CLS, SEP = '[PAD]', '[MASK]', '[CLS]', '[SEP]'


def prepare_input(tokens, tokenizer):
    token_index = torch.tensor(bert_tokenizer.convert_tokens_to_ids(tokens))
    seperation_index = tokens.index('[SEP]')
    segment_index = token_index * 0
    segment_index[(seperation_index + 1):] = 1
    mask = (token_index != 0)
    return token_index.unsqueeze(0), segment_index.unsqueeze(0), mask.unsqueeze(0)



def main():
    pass


if __name__ == '__main__':
    main()
