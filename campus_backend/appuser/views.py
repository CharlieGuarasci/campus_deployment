from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import AppUser
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
def get_users(request):
    users = AppUser.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def sign_in(request):
    data = request.data
    print("Raw Request Data:", request.data)

    email = data.get("email")
    password = data.get("password")

    try:
        user = AppUser.objects.get(email=email)  
        if check_password(password, user.password):  
            refresh = RefreshToken.for_user(user)
            return Response({
                "message": "Welcome Back.",
                "access_token": str(refresh.access_token),  
                "refresh_token": str(refresh)
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Password incorrect please try again."}, status=status.HTTP_400_BAD_REQUEST)
    except AppUser.DoesNotExist:
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_user(request):
    
    print("Received Data:", request.data)
    data = request.data.copy()

    if AppUser.objects.filter(email=data.get("email")).exists():
        return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)
    
    data["password"] = make_password(data["password"])


    serializer = UserSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)