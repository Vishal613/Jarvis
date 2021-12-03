import urllib
import re

from translator import detect_language, run_translate

class Query_Processor:

    '''
    Convert the given query to other languages (say input in english -> convert to spanish & hindi)
    Build query with high boost to original language and lesser boost for other languages
    '''
    def get_query(self, text, field_exists = None):
        if text == '*' or text.strip() == '' or text == None:
            if field_exists != None:
                return '/select?q.op=OR&q='+field_exists+'%3A%5B*%20TO%20*%5D'
            return '/select?q.op=OR&q=*%3A*'

        hashtags = []
        words = text.strip().split()
        for word in words:
            if word.startswith('#'):
                hashtags.append(word[1:])

        en_boost = 2
        es_boost = 2
        hi_boost = 2

        text_en = ''
        text_es = ''
        text_hi = ''

        detect_lang = detect_language(text)
        if detect_lang['score'] > 0.95:
            if detect_lang['language'] == 'es':
                es_boost = 4
                text_es = text
                text_en = run_translate(text, 'es', 'en')
                text_hi = run_translate(text, 'es', 'hi')
            elif detect_lang['language'] == 'en':
                en_boost = 4
                text_es = run_translate(text, 'en', 'es')
                text_en = text
                text_hi = run_translate(text, 'en', 'hi')
            elif detect_lang['language'] == 'hi':
                hi_boost = 4
                text_es = run_translate(text, 'hi', 'es')
                text_en = run_translate(text, 'hi', 'en')
                text_hi = text

        if text_es == '':
            text_es = text
        if text_en == '':
            text_en = text
        if text_hi == '':
            text_hi = text

        safe_query_text = urllib.parse.quote('('+text+')',safe='')
        safe_query_text_en = urllib.parse.quote('(' + text_en + ')', safe='')
        safe_query_text_es = urllib.parse.quote('(' + text_es + ')', safe='')
        safe_query_text_hi = urllib.parse.quote('(' + text_hi + ')', safe='')


        final_query = '/select?q.op=OR&q='
        if field_exists != None:
            final_query = final_query + field_exists + '%3A%5B*%20TO%20*%5D' + '%20AND%20'

        final_query = final_query + 'text_en%3A' + safe_query_text_en + '%5E' + str(en_boost) + \
                            '%20OR%20text_es%3A' + safe_query_text_es + '%5E' + str(es_boost) + \
                            '%20OR%20text_hi%3A' + safe_query_text_hi + '%5E' + str(hi_boost)

        if len(hashtags) > 0:
            tweet_hashtags = ' '.join(hashtags)
            safe_tweet_hashtags = urllib.parse.quote('(' + tweet_hashtags + ')', safe='')
            final_query = final_query + '%20OR%20hashtags%3A' + safe_tweet_hashtags + '%5E' + str(3)

        final_query = final_query + '%20OR%20tweet_text%3A' + safe_query_text + '%5E' + str(2)
        final_query = final_query + '%20OR%20hashtags%3A' + safe_query_text + '%5E' + str(1)
        # final_query = final_query + '&wt=json&indent=true&rows=20'

        return final_query

    '''
    Remove Special characters from the given text
    '''
    def clean(self, text, lang):
        clean_text = text.lower().strip()
        if(lang == 'en' or lang == 'es'):
            clean_text = re.sub(r"[^a-zA-Z0-9 ]", " ", clean_text)
        else:
            words = clean_text.split()
            words_alnum = []
            for word in words:
                word_alnum = []
                for c in word:
                    if c.isalnum():
                        word_alnum.append(c)
                    else:
                        word_alnum.append(' ')
                # word_alnum = ''.join(c for c in word if c.isalnum())
                words_alnum.append(''.join(word_alnum))
            clean_text = ' '.join(words_alnum)

        return clean_text

