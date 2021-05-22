
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TodoSerializer
from .models import Todo



@api_view(['GET'])
def api_summary(request):
    """ The available endpoints of the api. """

    api_endpoints = {
        'List': '/list/',
        'Detail': '/detail/<str:pk>',
        'Create': '/create/',
        'Delete': '/delete/<str:pk>/',
        'Update': '/update/<str:pk>/',
    }

    return Response(api_endpoints)

@api_view(['GET'])
def todo_list(request):
    """ Get all todo items for this user. """

    todos = Todo.objects.filter(session_key=request.session.session_key)
    # todos = Todo.objects.filter(session_key='123')

    serializer = TodoSerializer(todos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def todo_detail(request, pk):
    """ Single todo item. """
 
    todo = Todo.objects.get(pk=pk)
    
    if todo.session_key != request.session.session_key:
        return Response("You cannot access this item!")

    serializer = TodoSerializer(todo, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def todo_create(request):
    """ Create a new todo item """
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        # save item
        serializer.validated_data['session_key'] = request.session.session_key
        serializer.save()

    return Response(serializer.data)

@api_view(['PUT'])
def todo_update(request, pk):
    """ Update existing todo item """
    todo = Todo.objects.get(pk=pk)

    if todo.session_key != request.session.session_key:
        return Response("You cannot access this item!")
    
    serializer = TodoSerializer(instance=todo, data=request.data)
    if serializer.is_valid():
        serializer.validated_data['session_key'] = todo.session_key
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def todo_delete(request, pk):
    """ Delete todo item """
    todo = Todo.objects.get(pk=pk)

    if todo.session_key != request.session.session_key:
        return Response("You cannot access this item!")
    
    todo.delete()

    return Response('Item deleted.')