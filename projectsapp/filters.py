from django_filters import rest_framework as filters
from rest_framework.generics import ListAPIView

from projectsapp.models import Todo, Project


class ProjectFilters(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class TodoFilter(filters.FilterSet):
    short_note = filters.CharFilter(field_name='short_note__name', lookup_expr='contains')
    created_at = filters.DateFromToRangeFilter(field_name='created_at')

    class Meta:
        model = Todo
        fields = ['short_note', 'created_at']
