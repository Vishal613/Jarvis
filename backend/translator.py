from langdetect import DetectorFactory, detect
DetectorFactory.seed = 1

from googletrans import Translator, constants
translator_google = Translator()

import en_core_web_sm
from spacy_langdetect import LanguageDetector
from spacy.language import Language

@Language.factory('language_detector')
def language_detector(nlp, name):
    return LanguageDetector()

nlp = en_core_web_sm.load(disable=["tagger", "ner"])
nlp.max_length = 2000000
nlp.add_pipe('language_detector', last=True)

def detect_language(text):
    doc = nlp(text)
    detect_language = doc._.language
    return detect_language

def run_translate(text, src_lang, dest_lang):
    translated_text = translator_google.translate(text, dest=dest_lang, src=src_lang)
    return translated_text.text






