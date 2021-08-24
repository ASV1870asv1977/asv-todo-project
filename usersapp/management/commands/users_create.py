from django.core.management.base import BaseCommand

from usersapp.models import User


class Command(BaseCommand):
    help = 'Create users to test'

    def add_arguments(self, parser):
        parser.add_argument('count', type=int)

    def handle(self, *args, **options):
        User.objects.all().delete()
        count = options['count']
        for i in range(count):
            user = User.objects.create(username=f'логин{i}',
                                       firstname=f'имя{i}',
                                       lastname=f'фамилия{i}',
                                       email=f'адрес{i}')
            print(f'пользователь {user} создан')
        print('Выполнено')
