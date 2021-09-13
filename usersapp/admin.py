from django.contrib import admin

from usersapp.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'id', 'first_name', 'last_name', 'email')
