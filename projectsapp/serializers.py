from rest_framework.serializers import HyperlinkedModelSerializer, SlugRelatedField

from projectsapp.models import Project, Todo
from usersapp.models import User


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name', 'users', 'url_repo']


class TodoModelSerializer(HyperlinkedModelSerializer):
    short_note = SlugRelatedField(queryset=Project.objects.all(), slug_field='name')
    created_by = SlugRelatedField(queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = Todo
        fields = ['id', 'short_note', 'description', 'created_by', 'created_at', 'update_at', 'is_active']
