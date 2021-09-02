from rest_framework.serializers import HyperlinkedModelSerializer

from projectsapp.models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ['name', 'users', 'url_repo']


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ['short_note', 'description', 'created_by', 'created_at', 'update_at', 'is_activ']
