from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer


from usersapp.models import User


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']
