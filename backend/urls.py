from flask import Flask
import flask
from flask import request
from views import get_tweets_from_solr, get_tweets_by_countries, get_tweets_by_languages, get_replies_tweets_sentiment, \
    get_top_hash_tags, get_topics

app = Flask(__name__)


@app.route("/search", methods=['POST'])
def search():
    query = country = poi_name = language = start = rows = None
    if "query" in request.json:
        query = request.json["query"]
    if "country" in request.json:
        country = request.json["country"]
    if "poi_name" in request.json:
        poi_name = request.json["poi_name"]
    if "language" in request.json:
        language = request.json["language"]
    if "start" in request.json:
        start = request.json["start"]
    if "rows" in request.json:
        rows = request.json["rows"]

    tweets = get_tweets_from_solr(query, country, poi_name, language, start, rows, False)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


@app.route("/search/countries", methods=['POST'])
def countries():
    queries = request.json["query"]
    countries = request.json["country"]
    topics = request.json["poi"]
    languages = request.json["language"]
    tweets = get_tweets_by_countries(queries, countries, topics, languages)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


@app.route("/search/replies/sentiment", methods=['POST'])
def pois():
    query = country = poi_name = language = start = rows = None
    if "query" in request.json:
        query = request.json["query"]
    if "start" in request.json:
        start = request.json["start"]
    if "rows" in request.json:
        rows = request.json["rows"]
    tweet_response, positive_tweet, negative_tweet = get_replies_tweets_sentiment(query, start, rows)

    response = {
        "response": tweet_response,
        "positive_tweet": positive_tweet,
        "negative_tweet": negative_tweet
    }
    return flask.jsonify(response)


@app.route("/search/languages", methods=['POST'])
def languages():
    queries = request.json["query"]
    countries = request.json["country"]
    topics = request.json["poi_name"]
    languages = request.json["language"]
    tweets = get_tweets_by_languages(queries, countries, topics, languages)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


@app.route("/search/hashtags", methods=['POST'])
def hashtags():
    queries = request.json["query"]
    countries = request.json["country"]
    topics = request.json["poi_name"]
    languages = request.json["language"]
    result = get_top_hash_tags(queries, countries, topics, languages)

    response = {
        "response": result
    }
    return flask.jsonify(response)


@app.route("/topics", methods=['POST'])
def topics():
    queries = countries = poi_name = languages = None
    if "query" in request.json:
        queries = request.json["query"]
    if "country" in request.json:
        countries = request.json["country"]
    if "poi_name" in request.json:
        poi_name = request.json["poi_name"]
    if "language" in request.json:
        languages = request.json["language"]

    docs = get_tweets_from_solr(queries, countries, poi_name, languages, 0, 5000, True)
    topics = get_topics(docs)
    response = {
        "response": topics
    }
    return flask.jsonify(response)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999)
