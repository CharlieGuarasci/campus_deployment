from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.get_users, name='get_users'),
    path('edit-profile/', views.edit_profile, name='edit_profile'),
    path('sign-in/', views.sign_in, name='sign_in'),
    path('create-user/', views.create_user, name='create_user'),
    path('verify-email/<uuid:token>/', views.verify_email, name='verify_email'),
    path('request-password-reset/', views.request_password_reset, name='request_password_reset'),
    path('reset-password/<uuid:token>/', views.reset_password, name='reset_password'),
    path('test-email/', views.test_email, name='test_email'),
]