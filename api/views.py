from rest_framework import viewsets, permissions, generics, views
from rest_framework.response import Response
from knox.models import AuthToken

from . import serializers

class IndexAPI(views.APIView):
    
    permissions = [permissions.AllowAny]

    def get(self, request, format=None):
        return Response({
            'name': 'Kyle'
        })

class RegisterUserAPI(generics.GenericAPIView):
    """ Register new user """
    serializer_class = serializers.RegisterSerializer

    def post(self, request, *args, **kwargs):
        # register new user and generate a token for them.
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            'user': serializers.UserSerializer(user, context=self.get_serializer_context()).data,
            'token': AuthToken.objects.create(user)[1]
        })


class LoginUserAPI(generics.GenericAPIView):
    """ Login user """
    serializer_class = serializers.LoginSerializer
    
    def post(self, request, *args, **kwargs):
        # Login user, creating token. 
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": serializers.UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class RetrieveUserAPI(generics.RetrieveAPIView):
    """ Get user instace """
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = serializers.UserSerializer

    # override
    def get_object(self):
        return self.request.user


class TodoViewSet(viewsets.ModelViewSet):
    """ Handles creating and retrieving all todo items for a single user. """

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = serializers.TodoSerializer

    # override.
    def get_queryset(self):
        """ Get todo items for this user """
        return self.request.user.todos.all()
    
    # override.
    def preform_create(self, serializer):
        """ When creating todo item, set user. """
        serializer.save(user=self.request.user)


