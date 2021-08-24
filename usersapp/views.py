from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer


class UsersViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
