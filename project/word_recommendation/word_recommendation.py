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

    # Fixed format and checks, may change later when connecting to Deep
    args = parser.parse_args()
    assert os.path.exists(args.bert_model), '{} does not exist'.format(args.bert_model)
    assert os.path.exists(args.bert_vocab), '{} does not exist'.format(args.bert_vocab)
    assert args.topk > 0, '{} should be positive'.format(args.topk)


    print('Initialize BERT vocabulary from {}...'.format(args.bert_vocab))
    tokenizer = BertTokenizer(vocab_file=args.bert_vocab)
    print('Initialize BERT model from {}...'.format(args.bert_model))
    bert_model = BertForMaskedLM.from_pretrained(args.bert_model)

  

    while True:
        
        # Take sequences of words here, this logic will change once Speech to Text and
        # Word Recommendation modules are connected.
        sequence_of_words = input('Sequence of words for prediction: ').strip()


        # Prepare the input so that Bert is able to understand it
        bert_token = tokenizer.tokenize(sequence_of_words)


        # Checks for the tokens, seperations, classification?
        #TODO

        # Transform the given input into a format that bert would understand
        token_index, segment_index, mask = prepare_input(bert_token, tokenizer)

        # For now log-odds function is used, may change later to see if the model
        # predicts the missing words any better
        with torch.no_grad():
            logits = bert_model(token_index, segment_index, mask, masked_lm_labels=None)
        logits = logits.squeeze(0)

        # For now, as activation function softmax is used. May change later to see
        # if the model predicts the missing words any better
        probability_set = torch.softmax(logits, dim=-1)

        mask_count = 0

        for index, token in enumerate(bert_token):
            
            # Increase mask count when encountered
            if token == MASK:
                mask_count += 1
            
            # Output the predictions that wer made to fill in the masked zone
            print('Top {} predictions for {}th {}:'.format(args.topk, mask_count, MASK))
            
            topk_prob, topk_indices = torch.topk(probability_set[index, :], args.topk)
            topk_tokens = tokenizer.convert_ids_to_tokens(topk_indices.cpu().numpy())
            
            # The actual predictions are being output into the console here
            for prob, tok in zip(topk_prob, topk_tokens):
                print('{} {}'.format(tok, prob))

            print("\n")        
    

if __name__ == '__main__':
    main()
