from django.urls import path, include
from rest_framework.routers import DefaultRouter

import usersapp.views as usersapp


usersapp_router = DefaultRouter()
usersapp_router.register('usersapp', usersapp.UserCustomViewSet)

urlpatterns = [
    path('view/list/', include(usersapp_router.urls))
]