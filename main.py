from flask import Flask
import flask
from flask import request
from textblob import TextBlob
import requests
import json
import re

app = Flask(__name__)

CORE_NAME = "IRF21_class_demo"
AWS_IP = "localhost"


def clean_tweet(tweet):
    return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t])|(\w+:\/\/\S+)", " ", str(tweet)).split())


def read_dummy_data_from_json():
    with open("data/dummy" + ".json", "r") as file:
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


@app.route("/search", methods=['POST'])
def search():
    queries = request.json["queries"]
    countries = request.json["countries"]
    topics = request.json["topics"]
    languages = request.json["languages"]
    tweets = get_tweets_from_solr(queries, countries, topics, languages)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999)
