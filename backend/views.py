from textblob import TextBlob
import requests
import json
import re
import operator

CORE_NAME = "IRF21_class_demo"
AWS_IP = "localhost"


def clean_tweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", str(tweet)).split())


def read_dummy_data_from_json():
    with open("backend/data/dummy" + ".json", "r") as file:
        data = json.load(file)
    return data


def get_tweet_sentiment(tweet):
    # create TextBlob object of passed tweet text
    text = clean_tweet(tweet['tweet_text'])
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return 'positive', analysis.sentiment.polarity
    elif analysis.sentiment.polarity == 0:
        return 'neutral', analysis.sentiment.polarity
    else:
        return 'negative', analysis.sentiment.polarity


def transform_to_response(docs):
    response_tweets = []
    for doc in docs:
        sentiment_result, sentiment_score = get_tweet_sentiment(doc)
        doc['sentiment_result'] = sentiment_result
        doc['sentiment_score'] = sentiment_score
        response_tweets.append(doc)
    return response_tweets


def get_tweets_from_solr(queries=None, countries=None, topics=None, languages=None):
    try:

        solr_url = 'http://{AWS_IP}:8983/solr/{CORE_NAME}'.format(AWS_IP=AWS_IP, CORE_NAME=CORE_NAME)
        solr_url = solr_url + '/select?q.op=OR&q=' + queries + '&rows=20'
        docs = requests.post(solr_url)
        if docs is not None and len(docs.response.docs) != 0:
            docs = docs.response.docs

    except Exception as ex:
        print(ex)
        docs = read_dummy_data_from_json()

    tweet_response = transform_to_response(docs)
    return tweet_response


def get_tweets_by_countries(queries=None, countries=None, topics=None, languages=None):
    tweets = get_tweets_from_solr(queries, countries, topics, languages)
    tweet_response = {
        "USA": 0,
        "INDIA": 0,
        "MEXICO": 0
    }
    for tweet in tweets:
        if tweet['country'][0] == 'USA':
            tweet_response["USA"] += 1
        elif tweet['country'][0] == 'INDIA':
            tweet_response["INDIA"] += 1
        elif tweet['country'][0] == 'MEXICO':
            tweet_response["MEXICO"] += 1
    return tweet_response


def get_tweets_by_pois(queries=None, countries=None, topics=None, languages=None):
    tweets = get_tweets_from_solr(queries, countries, topics, languages)
    tweet_response = {
        "USA": 0,
        "INDIA": 0,
        "MEXICO": 0
    }
    for tweet in tweets:
        if tweet['country'][0] == 'USA':
            tweet_response["USA"] += 1
        elif tweet['country'][0] == 'INDIA':
            tweet_response["INDIA"] += 1
        elif tweet['country'][0] == 'MEXICO':
            tweet_response["MEXICO"] += 1
    return tweet_response


def get_tweets_by_languages(queries=None, countries=None, topics=None, languages=None):
    tweets = get_tweets_from_solr(queries, countries, topics, languages)
    tweet_response = {
        "ENGLISH": 0,
        "HINDI": 0,
        "SPANISH": 0
    }
    for tweet in tweets:
        if tweet['tweet_lang'][0] == 'en':
            tweet_response["ENGLISH"] += 1
        elif tweet['tweet_lang'][0] == 'hi':
            tweet_response["HINDI"] += 1
        elif tweet['tweet_lang'][0] == 'es':
            tweet_response["SPANISH"] += 1
    return tweet_response


def get_top_hash_tags(queries=None, countries=None, topics=None, languages=None):
    tweets = get_tweets_from_solr(queries, countries, topics, languages)
    hashtags_by_freq = {}
    for tweet in tweets:
        if 'hashtags' not in tweet:
            continue
        hashtags = tweet['hashtags']
        count_frequency(hashtags, hashtags_by_freq)
    result = dict(sorted(hashtags_by_freq.items(), key=operator.itemgetter(1), reverse=True))
    return result


def count_frequency(my_list, hashtags_by_freq):
    for item in my_list:
        if item in hashtags_by_freq:
            hashtags_by_freq[item] += 1
        else:
            hashtags_by_freq[item] = 1
