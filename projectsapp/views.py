from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from projectsapp.models import Project, Todo
from projectsapp.serializers import ProjectModelSerializer, TodoModelSerializer


class ProjectViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class TodoViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
