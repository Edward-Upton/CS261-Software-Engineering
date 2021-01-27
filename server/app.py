from flask import Flask
from flask_restful import Api
from flask_socketio import SocketIO, emit, send
from datetime import date

from werkzeug import debug

from database.db import initialiseDB
from resources.routes import initialiseRoutes

from namespaces.namespaces import initialiseNamespaces

app = Flask(__name__)
api = Api(app)

app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

# Location of MongoDB database (using MongoDB Atlas Free Database for this)
app.config["MONGODB_HOST"] = "mongodb+srv://newUser:O1MHlEHLB5Zp0S83@cs261.h465i.mongodb.net/cs261?retryWrites=true&w=majority"

# Initialise database and resource API
initialiseDB(app)
initialiseRoutes(api)
initialiseNamespaces(socketio)

count = 0

# This gets run when a device connects to the default namespace


@socketio.on('connect')
def onConnection():
    global count
    print("received client on default")
    emit("message", "You are connected to DEFAULT")
    emit("count", {"newCount": count})


@app.route('/incrementCount')
def incrementCount():
    global count
    print("increment count received", count, "->", count + 1)
    count += 1
    socketio.emit("count", {"newCount": count})
    return "Increment Count"


def usersUpdated(users):
    print("users have been updated", users)
    socketio.emit("usersUpdate", {"newUsers": users})


if __name__ == '__main__':
    # This will host the API at your device IP, meaning you can access it from
    # other devices on the same network thorugh e.g. 192.168.1.20/api/.......
    socketio.run(app, host='0.0.0.0', port=80, debug=True)
