from rest_framework.serializers import HyperlinkedModelSerializer, SlugRelatedField, ModelSerializer

from projectsapp.models import Project, Todo
from usersapp.models import User


class ProjectModelSerializer(ModelSerializer):

    class Meta:
        model = Project
        fields = ['id', 'name', 'users', 'url_repo']


class TodoModelSerializer(HyperlinkedModelSerializer):
    short_note = SlugRelatedField(queryset=Project.objects.all(), slug_field='id')
    created_by = SlugRelatedField(queryset=User.objects.all(), slug_field='last_name')

    class Meta:
        model = Todo
        fields = ['id', 'short_note', 'description', 'created_by', 'created_at', 'update_at', 'is_active']
