from django.urls import path, include
from rest_framework import routers
from knox import views as knox_views

from . import views

urlpatterns = [
    path('', views.IndexAPI.as_view(),),
    path('auth/', include('knox.urls')),
    path('auth/register', views.RegisterUserAPI.as_view()),
    path('auth/login', views.LoginUserAPI.as_view()),
    path('auth/user', views.RetrieveUserAPI.as_view()),
    path('auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'), # invalidates token. 
]

router = routers.DefaultRouter()
router.register('todos', views.TodoViewSet, 'todos')
urlpatterns += router.urls