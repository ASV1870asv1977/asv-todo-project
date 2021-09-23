from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.viewsets import ModelViewSet

from usersapp.models import User
from usersapp.serializers import UserModelSerializer, UserBaseModelSerializer


class UserCustomViewSet(mixins.ListModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.version == '0.2':
            return UserModelSerializer
        return UserBaseModelSerializer
