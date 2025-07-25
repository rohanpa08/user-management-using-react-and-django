from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("users/", views.user_list_create, name='user_list_create'),
    path("users/<int:user_id>/", views.user_detail_update_delete, name='user_detail_update_delete'),
]