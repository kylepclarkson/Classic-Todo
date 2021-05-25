from django.urls import path, include

# from rest_framework.authtoken.views import obtain_auth_token

from . import views

urlpatterns = [
    path('', views.api_summary),
    path('list/', views.todo_list),
    path('detail/<str:pk>/', views.todo_detail),
    path('create/', views.todo_create),
    path('update/<str:pk>/', views.todo_update,),
    path('delete/<str:pk>/', views.todo_delete),
    path('register/', views.register_user),
    path('login/', views.login_user),
]