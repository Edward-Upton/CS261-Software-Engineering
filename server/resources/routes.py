# Routes URLs to Recourses
from .user import UsersApi, UserApi

def initialiseRoutes(api):
    api.add_resource(UsersApi, '/api/users')
    api.add_resource(UserApi, '/api/user/<id>')