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
    newValue = data["newValue"]
    field = data["field"]

    curUTC = datetime.now(timezone.utc)
    field["data"]["average"] = processor.emoji(newValue, field["data"]["average"], len(field["data"]["timeSeries"]))
    field["data"]["timeSeries"].append({"value": newValue, "date": curUTC})

    return {"field": field}


if __name__ == "__main__":
    app.run('0.0.0.0', port=4000, debug=True)
