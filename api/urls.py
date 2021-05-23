from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.api_summary),
    path('list/', views.todo_list),
    path('detail/<str:pk>/', views.todo_detail),
    path('create/', views.todo_create),
    path('update/<str:pk>/', views.todo_update,),
    path('delete/<str:pk>/', views.todo_delete),
]