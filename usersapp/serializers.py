from rest_framework.serializers import ModelSerializer
from rest_framework.serializers import HyperlinkedModelSerializer


from usersapp.models import User


class UserBaseModelSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserModelSerializer(UserBaseModelSerializer):

    class Meta(UserBaseModelSerializer.Meta):
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser']
