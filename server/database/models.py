# Define the structure of 'tables' for the database
from .db import db

class User(db.Document):
    email = db.StringField(required = True, unique = True)
    password = db.StringField(required = True)