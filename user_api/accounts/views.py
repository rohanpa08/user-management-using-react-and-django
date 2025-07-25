from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from . import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

# Create your views here.


@api_view(['GET', 'POST'])
def user_list_create(request):
    """
    List all the users or create a new user
    """
    if request.method == 'GET':
        users = User.objects.all()
        serializer = serializers.AuthUserSerializer(users, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = serializers.AuthUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET', 'PUT', 'PATCH', 'DELETE'])
def user_detail_update_delete(request, user_id):
    """
    Retrieve, update, or delete a user by ID
    """
    user = get_object_or_404(User, id=user_id)

    if request.method == 'GET':
        serializer = serializers.AuthUserSerializer(user)
        return Response(serializer.data)

    elif request.method in ['PUT', 'PATCH']:
        serializer = serializers.AuthUserSerializer(user, data=request.data, partial=(request.method == 'PATCH'))
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)




