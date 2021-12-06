from flask import Flask
import flask
from flask import request
from views import get_tweets_from_solr, get_tweets_by_countries, get_tweets_by_languages, get_replies_tweets_sentiment, \
    get_top_hash_tags, get_topics, get_tweets_by_sentiment
import speech_recognition as sr

app = Flask(__name__)


@app.route("/search", methods=['POST'])
def search():
    query = country = poi_name = language = start = rows = additional_filters = None
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
    if "additional_filters" in request.json:
        additional_filters = request.json["additional_filters"]

    tweets, num_found = get_tweets_from_solr(query, country, poi_name, language, start, rows, False, additional_filters = additional_filters)

    response = {
        "total_num": num_found,
        "response": tweets
    }
    return flask.jsonify(response)


@app.route("/search/countries", methods=['POST'])
def countries():
    query = country = poi_name = language = start = rows = additional_filters = None
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
    if "additional_filters" in request.json:
        additional_filters = request.json["additional_filters"]
    tweets = get_tweets_by_countries(query, country, poi_name, language, start, rows, additional_filters=additional_filters)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


@app.route("/search/replies/sentiment", methods=['POST'])
def pois():
    query = country = poi_name = language = start = rows = additional_filters = None
    if "query" in request.json:
        query = request.json["query"]
    if "start" in request.json:
        start = request.json["start"]
    if "rows" in request.json:
        rows = request.json["rows"]
    if "additional_filters" in request.json:
        additional_filters = request.json["additional_filters"]
    tweet_response, positive_tweet, negative_tweet = get_replies_tweets_sentiment(query, start, rows, additional_filters=additional_filters)

    response = {
        "response": tweet_response,
        "positive_tweet": positive_tweet,
        "negative_tweet": negative_tweet
    }
    return flask.jsonify(response)


@app.route("/search/languages", methods=['POST'])
def languages():
    query = country = poi_name = language = start = rows = additional_filters = None
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
    if "additional_filters" in request.json:
        additional_filters = request.json["additional_filters"]
    tweets = get_tweets_by_languages(query, country, poi_name, language, start, rows, additional_filters=additional_filters)

    response = {
        "response": tweets
    }
    return flask.jsonify(response)


@app.route("/search/hashtags", methods=['POST'])
def hashtags():
    query = country = poi_name = language = start = rows = additional_filters = None
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
    if "additional_filters" in request.json:
        additional_filters = request.json["additional_filters"]
    result = get_top_hash_tags(query, country, poi_name, language, start, rows, additional_filters=additional_filters)

    response = {
        "response": result
    }
    return flask.jsonify(response)


@app.route("/search/sentiment", methods=['POST'])
def sentiment():
    query = country = poi_name = language = start = rows = additional_filters = None
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
    if "additional_filters" in request.json:
        additional_filters = request.json["additional_filters"]
    result = get_tweets_by_sentiment(query, country, poi_name, language, start, rows, additional_filters=additional_filters)

    response = {
        "response": result
    }
    return flask.jsonify(response)


@app.route("/topics", methods=['POST'])
def topics():
    queries = countries = poi_name = languages = additional_filters = None
    if "query" in request.json:
        queries = request.json["query"]
    if "country" in request.json:
        countries = request.json["country"]
    if "poi_name" in request.json:
        poi_name = request.json["poi_name"]
    if "language" in request.json:
        languages = request.json["language"]
    if "additional_filters" in request.json:
        additional_filters = request.json["additional_filters"]

    docs,_ = get_tweets_from_solr(queries, countries, poi_name, languages, 0, 5000, True, additional_filters=additional_filters)
    topics = get_topics(docs)
    response = {
        "response": topics
    }
    return flask.jsonify(response)

@app.route("/voice", methods=['POST'])
def voice():
    list_country = ['india','usa','mexico']
    list_language = ['hindi','spanish','english']
    lang_map = {'hindi':'hi', 'english':'en', 'spanish':'es'}
    recording = sr.Recognizer()
    language = ''
    country = ''
    with sr.Microphone() as source: 
        recording.adjust_for_ambient_noise(source)
        print("Please Say something:")
        audio = recording.listen(source)
        try:
            speech = recording.recognize_google(audio)
            print("You said: " + speech)
            li = speech.split(' ')
            query = list(li)
            for i in li:
                if(i.lower() in list_country):
                    country = i
                    query.remove(i)
                if(i.lower() in list_language):
                    language = i
                    query.remove(i)
            query = ' '.join(query)
            print('query: ',query)
            print('country: ',country)
            print('language: ',language)
            if(country!=''):
                country = country.upper()
            if(language!=''):
                language = language.lower()
                language = lang_map[language]
            return {'query':query, 'country':country, 'language':language}
        except Exception as e:
            print(e)
            return {}
        
if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999)
