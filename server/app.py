from flask import Flask
from flask_restful import Api

from database.db import initialiseDB
from resources.routes import initialiseRoutes

app = Flask(__name__)
api = Api(app)

# Location of MongoDB database (using MongoDB Atlas Free Database for this)
app.config["MONGODB_HOST"] = "mongodb+srv://newUser:O1MHlEHLB5Zp0S83@cs261.h465i.mongodb.net/cs261?retryWrites=true&w=majority"

# Initialise database and resource API
initialiseDB(app)
initialiseRoutes(api)

if __name__ == '__main__':
    # This will host the API at your device IP, meaning you can access it from
    # other devices on the same network thorugh e.g. 192.168.1.20/api/.......
    app.run(host='0.0.0.0', port=80)