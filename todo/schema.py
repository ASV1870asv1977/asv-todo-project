from graphene import Schema, ObjectType, String, List, Field, Int, Mutation, ID
from graphene_django import DjangoObjectType

from projectsapp.models import Project, Todo
from usersapp.models import User


class ProjectDjangoType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoDjangoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = '__all__'


class UserDjangoType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class Query(ObjectType):

    all_projects = List(ProjectDjangoType)
    project_by_name = List(ProjectDjangoType,
                         name=String())
    all_todos = List(TodoDjangoType)
    all_users = List(UserDjangoType)

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_project_by_name(self, info, name):
        return Project.objects.filter(name__contains=name)

    def resolve_all_todos(self, info):
        return Todo.objects.all()

    def resolve_all_users(self, info):
        return User.objects.all()


schema = Schema(query=Query)

# Вариант запроса в http://127.0.0.1:8000/graphql/
# {
#   allProjects {
#     id
#     name
#     urlRepo
#     users {
#       firstName
#       lastName
#     }
#     todoProject {
#       description
#       createdBy {
#         firstName
#         lastName
#       }
#       createdAt
#       updateAt
#     }
#   }
# }

# Вариант запроса для детализации по имени проекта в ProjectDetails.js
# {
#   projectByName(name: "Smart") {
#     id
#     name
#     urlRepo
#     users {
#       firstName
#       lastName
#     }
#     todoProject {
#       description
#       createdBy {
#         firstName
#         lastName
#       }
#       createdAt
#       updateAt
#     }
#   }
# }
