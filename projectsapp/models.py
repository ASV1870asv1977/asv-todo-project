from django.db import models

from usersapp.models import User


class Project(models.Model):
    name = models.CharField('Название проекта', max_length=64, unique=True)
    url_repo = models.URLField('Ссылка на репозиторий', max_length=128, blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'


class Todo(models.Model):
    short_note = models.ForeignKey(Project, on_delete=models.CASCADE)
    description = models.TextField()
    created_by = models.ForeignKey(User, related_name='user_created_by', on_delete=models.PROTECT)
    created_at = models.DateTimeField('Дата созданния', auto_now_add=True)
    update_at = models.DateTimeField('Дата обновления', auto_now=True)
    is_activ = models.BooleanField(default=False)
