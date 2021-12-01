from flask import Flask
import flask
from flask import request
from views import get_tweets_from_solr, get_tweets_by_countries, get_tweets_by_languages, get_tweets_by_pois, \
    get_top_hash_tags

app = Flask(__name__)


@app.route("/search", methods=['POST'])
def search():
    queries = countries = poi_name = languages = start = rows = None
    if "queries" in request.json:
        queries = request.json["queries"]
    if "countries" in request.json:
        countries = request.json["countries"]
    if "poi_name" in request.json:
        poi_name = request.json["poi_name"]
    if "languages" in request.json:
         languages = request.json["languages"]
    if "start" in request.json:
        start = request.json["start"]
    if "rows" in request.json:
        rows = request.json["rows"]

    tweets = get_tweets_from_solr(queries, countries, poi_name, languages, start, rows)

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

@app.route("/search/hashtags", methods=['POST'])
def hashtags():
    queries = request.json["queries"]
    countries = request.json["countries"]
    topics = request.json["poi"]
    languages = request.json["languages"]
    result = get_top_hash_tags(queries, countries, topics, languages)

    response = {
        "response": result
    }
    return flask.jsonify(response)


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999)
