from flask import Flask
import flask
from flask import request
from views import get_tweets_from_solr, get_tweets_by_countries, get_tweets_by_languages, get_tweets_by_pois

app = Flask(__name__)


@app.route("/search", methods=['POST'])
def search():
    queries = request.json["queries"]
    countries = request.json["countries"]
    topics = request.json["poi"]
    languages = request.json["languages"]
    tweets = get_tweets_from_solr(queries, countries, topics, languages)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


@app.route("/search/countries", methods=['POST'])
def countries():
    queries = request.json["queries"]
    countries = request.json["countries"]
    topics = request.json["poi"]
    languages = request.json["languages"]
    tweets = get_tweets_by_countries(queries, countries, topics, languages)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)

@app.route("/search/pois", methods=['POST'])
def pois():
    queries = request.json["queries"]
    countries = request.json["countries"]
    topics = request.json["poi"]
    languages = request.json["languages"]
    tweets = get_tweets_by_pois(queries, countries, topics, languages)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)

@app.route("/search/languages", methods=['POST'])
def languages():
    queries = request.json["queries"]
    countries = request.json["countries"]
    topics = request.json["poi"]
    languages = request.json["languages"]
    tweets = get_tweets_by_languages(queries, countries, topics, languages)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999)