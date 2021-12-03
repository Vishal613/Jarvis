import speech_recognition as sr
list_country = ['india','usa','mexico']
list_language = ['hindi','spanish','english']

if __name__=="__main__":
    print('in')
    recording = sr.Recognizer()
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
        except Exception as e:
            print(e)