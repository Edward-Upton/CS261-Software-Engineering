# Resource desciption for User and Users
from flask import Response, request
from flask_restful import Resource

from database.models import User

# This resource is used for admins to get all users and for a user to register
class UsersApi(Resource):
    def get(self):
        users = User.objects().to_json()
        return Response(users, mimetype="application/json", status=200)

    def post(self):
        body = request.get_json()
        user = User(**body).save()
        id = user.id
        users = User.objects.get()
        print(type(users), users)
        return {'id': str(id)}, 200

# This resource is used by a user with a user ID to get, modify or delete their account
class UserApi(Resource):
    def get(self, id):
        user = User.objects.get(id = id).to_json()
        return Response(user, mimetype="application/json", status=200)

    def put(self, id):
        body = request.get_json()
        User.objects.get(id = id).update(**body)
        return '', 200
    
    def delete(self, id):
        User.objects.get(id = id).delete()
        return '', 200


