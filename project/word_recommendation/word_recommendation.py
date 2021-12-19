import argparse
import os
import torch
from pytorch_pretrained_bert import BertTokenizer, BertFoMaskedLM

PAD, MASK, CLS, SEP = '[PAD]', '[MASK]', '[CLS]', '[SEP]'

parser = argparse.ArgumentParser()
parser.add_argument('--bert-model', type=str, default='bert_models/bert-base-uncased.tar.gz', help='path to bert model')
parser.add_argument('--bert-vocab', type=str, default='bert_models/bert-base-uncased-vocab.txt', help='path to bert vocabulary')
parser.add_argument('--topk', type=int, default=3, help='show top k predictions')


def prepare_input(tokens, tokenizer):
    token_index = torch.tensor(bert_tokenizer.convert_tokens_to_ids(tokens))
    seperation_index = tokens.index('[SEP]')
    segment_index = token_index * 0
    segment_index[(seperation_index + 1):] = 1
    mask = (token_index != 0)
    return token_index.unsqueeze(0), segment_index.unsqueeze(0), mask.unsqueeze(0)



def main():
    args = parser.parse_args()
    assert os.path.exists(args.bert_model), '{} does not exist'.format(args.bert_model)
    assert os.path.exists(args.bert_vocab), '{} does not exist'.format(args.bert_vocab)
    assert args.topk > 0, '{} should be positive'.format(args.topk)


    print('Initialize BERT vocabulary from {}...'.format(args.bert_vocab))
    tokenizer = BertTokenizer(vocab_file=args.bert_vocab)
    print('Initialize BERT model from {}...'.format(args.bert_model))
    bert_model = BertForMaskedLM.from_pretrained(args.bert_model)

    

if __name__ == '__main__':
    main()
