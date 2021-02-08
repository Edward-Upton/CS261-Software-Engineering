from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    return "WORKING"


@app.route('/emoji', methods=['POST'])
def emoji():
    data = request.json
    print(data)
    newValue = data["newValue"]
    field = data["field"]

    return {"newValue": newValue, "field": field}


if __name__ == "__main__":
    app.run('0.0.0.0', port=4000, debug=True)
