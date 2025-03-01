from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import StudentUser
from .serializers import UserSerializer
# Create your views here.


@api_view(['GET'])
def get_users(request):
    users = StudentUser.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def create_user(request):
    serealizer = UserSerializer(data=request.data)

    if serealizer.is_valid():
        serealizer.save()
        return Response(serealizer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)