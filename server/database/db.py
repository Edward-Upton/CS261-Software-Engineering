from flask_mongoengine import MongoEngine

db = MongoEngine()

def initialiseDB(app):
    db.init_app(app)