from flask_socketio import SocketIO, emit, send
from flask_socketio import SocketIO, emit, send


def initialiseUserNamespace(socketio):
    # This gets run when a device connects to the user namespace
    @socketio.on('connect', namespace="/user")
    def connection():
        print("received client on user namespace")
        emit('message', "You are connected to USER")