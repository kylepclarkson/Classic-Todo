from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


from .serializers import TodoSerializer, RegistrationSerializer, LoginSerializer
from .models import Todo

from api import serializers



@api_view(['GET'])
def api_summary(request):
    """ The available endpoints of the api. """

    api_endpoints = {
        'List': '/list/',
        'Detail': '/detail/<str:pk>',
        'Create': '/create/',
        'Delete': '/delete/<str:pk>/',
        'Update': '/update/<str:pk>/',
        'Register': '/register/',
        'Login': '/login/'
    }

    return Response(api_endpoints)

@api_view(['POST'])
def register_user(request):
    """ Register new user. """
    serializer = RegistrationSerializer(data=request.data)
    data = {}
    if serializer.is_valid():
        user = serializer.save()
        print(type(user))
        data['response'] = "Successfully created new user"
        # create token, assign to user.
        token = Token.objects.create(user=user)
        data['token'] = token.key
    else:
        data = serializer.errors

    return Response(data)


@api_view(['POST'])
def login_user(request):
    """ Login existing user. """
    print("view called")
    serializer = LoginSerializer(data=request.data)

    data = {}
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            data['token'] = token.key
        else:
            data['error'] = ['Invalid login credentials!']
    else:
        data['error'] = [serializer.errors]
    return Response(data=data)




@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def todo_list(request):
    """ Get all todo items for this user. """

    todos = Todo.objects.all()

    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data,)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def todo_detail(request, pk):
    """ Single todo item. """
 
    todo = Todo.objects.get(pk=pk)

    serializer = TodoSerializer(todo, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def todo_create(request):
    """ Create a new todo item """
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def todo_update(request, pk):
    """ Update existing todo item """
    todo = Todo.objects.get(pk=pk)
    
    serializer = TodoSerializer(instance=todo, data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def todo_delete(request, pk):
    """ Delete todo item """
    todo = Todo.objects.get(pk=pk)
    
    todo.delete()

    return Response('Item deleted.')