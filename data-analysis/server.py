from flask import Flask

app = Flask(__name__)


@app.route('/')
def index():
    return "WORKING"


if __name__ == "__main__":
    app.run('0.0.0.0', port=4000, debug=True)
