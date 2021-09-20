from django.test import TestCase
from django.contrib.auth import get_user_model
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient

from projectsapp.models import Project, Todo
from projectsapp.views import ProjectViewSet


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.superuser = get_user_model().objects.create_superuser(
            'django', 'django@gb.local', 'geekbrains'
        )
        self.user = get_user_model().objects.create_user(
            'user_1', 'user_1@gb.local', 'geekbrains'
        )
        self.project_data = {'name': 'Super Stars',
                             'url_repo': '',
                             'users': 3
                             }
        self.project_data_upd = {'name': 'Super Losers',
                                 'url_repo': '',
                                 'users': 4
                                 }

    def test_get_list_guest(self):
        # 1.1
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        response.render()
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_list_auth(self):
        print(self.user, self.user.email)
        # 1.2 APIRequestFactory
        factory = APIRequestFactory()
        request = factory.get('/api/projects/')
        force_authenticate(request, user=self.user)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        # 2
        data = {'name': 'Super Puper',
                'url_repo': '',
                'users': 4
                }
        factory = APIRequestFactory()
        request = factory.post(
            '/api/projects/',
            data,
            format='json'
        )
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_admin(self):
        # 3.1
        data = {'name': 'Super Stars',
                'url_repo': '',
                'users': 3
                }
        factory = APIRequestFactory()
        request = factory.post(
            '/api/projects/',
            data,
            format='json'
        )
        force_authenticate(request, user=self.superuser)

        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_user(self):
        # 3.2
        factory = APIRequestFactory()
        request = factory.post(
            '/api/authors/',
            self.project_data,
            format='json'
        )
        force_authenticate(request, user=self.user)
        view = ProjectViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail_guest(self):
        # 4. APIClient
        project = Project.objects.create(**self.project_data)
        project.users.add(self.user)
        project.save()
        client = APIClient()
        response = client.get(f'/api/projects/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_edit_admin(self):
        # 6.
        project = Project.objects.create(**self.project_data)
        project.users.set([self.user])
        project.save()
        client = APIClient()
        client.login(username='django', password='geekbrains')
        response = client.put(f'/api/projects/{project.id}/', self.project_data_upd)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, self.project_data_upd['name'])
        self.assertEqual(project.url_repo, self.project_data_upd['url_repo'])
        self.assertEqual(project.users, self.project_data_upd['users'])
        client.logout()

    def test_edit_mixer(self):
        todo = mixer.blend(Todo)
        print('todo------>>', todo.short_note, todo.created_by.last_name)
        self.client.force_login(user=self.superuser)
        response = self.client.put(f'/api/todos/{todo.id}/',
                                   {'short_note': 'Short Note',
                                    'description': todo.description,
                                    'created_by': todo.created_by.id,
                                    'created_at': todo.created_at,
                                    'update_at': todo.update_at,
                                    'is_active': todo.is_active
                                    })
        print(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.short_note, 'Short Note')
