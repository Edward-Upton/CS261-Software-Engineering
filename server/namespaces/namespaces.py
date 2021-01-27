from .user import initialiseUserNamespace

def initialiseNamespaces(socketio):
    initialiseUserNamespace(socketio)