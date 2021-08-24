from django.contrib import admin

from usersapp.models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass
