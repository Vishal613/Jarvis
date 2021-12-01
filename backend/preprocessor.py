from nltk.stem import PorterStemmer
import re
from nltk.corpus import stopwords
import nltk

nltk.download('stopwords')


class Preprocessor:
    def __init__(self):
        self.stop_words = set(stopwords.words('english'))
        self.ps = PorterStemmer()

    def tokenizer(self, text):
        text_lower = text.lower()
        removed_text = re.sub(r"[^a-zA-Z0-9]+", ' ', text_lower)
        text_tokens = removed_text.split()
        removed_stop_words_tokens = [w for w in text_tokens if w not in self.stop_words]
        ps = PorterStemmer()
        text_stemmed = [ps.stem(w) for w in removed_stop_words_tokens]
        return text_stemmed

