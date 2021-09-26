from django.db import models

from usersapp.models import User


class Project(models.Model):
    name = models.CharField('Название проекта', max_length=64, unique=True)
    url_repo = models.URLField('Ссылка на репозиторий', blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        ordering = ['pk']


class Todo(models.Model):
    short_note = models.ForeignKey(Project,
                                   related_name='todo_project',
                                   on_delete=models.CASCADE)
    description = models.TextField()
    created_by = models.ForeignKey(User,
                                   related_name='user_todo',
                                   on_delete=models.PROTECT)
    created_at = models.DateTimeField('Дата созданния',
                                      auto_now_add=True)
    update_at = models.DateTimeField('Дата обновления',
                                     auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['pk']
