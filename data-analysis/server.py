from flask import Flask, request
from datetime import datetime, timezone
from process import Processor

app = Flask(__name__)

processor = Processor()


@app.route('/', methods=['GET', 'POST'])
def index():
    return "WORKING"


@app.route('/emoji', methods=['POST'])
def emoji():
    data = request.json
    print(data)
    newValue = data["value"]
    field = data["field"]
    startTime = data["startTime"]

    curUTC = datetime.now(timezone.utc)
    field["data"]["average"] = processor.runningAvg(
        newValue, field["data"]["average"], field["data"]["num"])
    field["data"]["timeSeries"] = processor.timeSeries(newValue, field["data"]["timeSeries"], 30, startTime)
    field["data"]["num"] += 1

    return {"field": field}


@app.route('/rating', methods=['POST'])
def rating():
    data = request.json
    print(data)
    newValue = data["value"]
    field = data["field"]

    curUTC = datetime.now(timezone.utc)
    field["data"]["average"] = processor.runningAvg(
        newValue, field["data"]["average"], field["data"]["num"])
    field["data"]["timeSeries"].append({"value": newValue, "date": curUTC})
    field["data"]["num"] += 1

    return {"field": field}


@app.route('/text', methods=['POST'])
def text():
    data = request.json
    print(data)
    newValue = data["value"]
    field = data["field"]

    curUTC = datetime.now(timezone.utc)

    keyPhrases = processor.textKeyPhrases(newValue)
    for i in range(len(keyPhrases)):
        keyPhrases[i] = {"phrase": keyPhrases[i], "date": curUTC}
    field["data"]["keyPhrases"].extend(keyPhrases)

    adjectives, sentiment = processor.textAdjectives(newValue)
    field["data"]["average"] = processor.runningAvg(sentiment, field["data"]["average"], field["data"]["num"]);
    for adjective in adjectives:
        foundWord = False
        for item in field["data"]["adjFreq"]:
            if adjective == item["word"]:
                item["freq"] += 1
                foundWord = True
                break;
        if not foundWord:
            field["data"]["adjFreq"].append({"word": adjective, "freq": 1})


    field["data"]["num"] += 1
    return {"field": field}


if __name__ == "__main__":
    app.run('0.0.0.0', port=4000, debug=True)
