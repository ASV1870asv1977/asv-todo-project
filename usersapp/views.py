from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer


class UsersViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer


class UserCustomViewSet(mixins.CreateModelMixin,
                        mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    