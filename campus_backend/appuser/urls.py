from django.urls import path
from .views import get_users, create_user, sign_in, edit_profile


urlpatterns = [
    path('users/', get_users, name="get_users"),
    path('register/', create_user, name="register"),
    path('signin/', sign_in, name="signin"),
    path('edit_profile/', edit_profile, name="edit_profile")

]