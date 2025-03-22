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
from django.utils import timezone
from datetime import timedelta
import uuid
from .email_utils import send_verification_email, send_password_reset_email
from django.core.mail import send_mail
from django.conf import settings

@api_view(['GET'])
def get_users(request):
    users = AppUser.objects.all()
    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)

@api_view(['POST'])
def edit_profile(request):
    data = request.data
    user_id = data.get("user_id")
    if not user_id:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)


    try:
        user = AppUser.objects.get(id=user_id)
        user.username = data.get("username", user.username)
        user.bio = data.get("bio", user.bio)
        user.location = data.get("location", user.location)
        user.save()

        return Response({"message": "Profile updated successfully", "user": {
            "name": user.name,
            "email": user.email,
            "bio": user.bio,
            "location": user.location
        }}, status=status.HTTP_200_OK)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def sign_in(request):
    data = request.data

    email = data.get("email")
    password = data.get("password")

    print(f"Attempting sign in for email: {email}")  # Debug log

    try:
        user = AppUser.objects.get(email=email)  
        print(f"User found: {user.email}")  # Debug log
        
        if not user.is_email_verified:
            print("Email not verified")  # Debug log
            return Response({"error": "Please verify your email before signing in"}, status=status.HTTP_400_BAD_REQUEST)
            
        if check_password(password, user.password):  
            refresh = RefreshToken.for_user(user)
            response_data = {
                "message": "Welcome Back.",
                "access_token": str(refresh.access_token),
                "refresh_token": str(refresh),
                "user": {  
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "bio": user.bio,
                    "location": user.location,
                }
            }
            print("🟢 Sign-in successful")  # Debug log
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            print("❌ Password incorrect")  # Debug log
            return Response({"error": "Password incorrect please try again."}, status=status.HTTP_400_BAD_REQUEST)
    except AppUser.DoesNotExist:
        print(f"❌ User not found with email: {email}")  # Debug log
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_user(request):
    data = request.data.copy()

    # Validate email domain
    email = data.get("email", "")
    print(f"Attempting to create user with email: {email}")  # Debug log
    
    if not email.endswith("@queensu.ca"):
        print("❌ Invalid email domain")  # Debug log
        return Response(
            {"error": "Only @queensu.ca email addresses are allowed"}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    if AppUser.objects.filter(email=data.get("email")).exists():
        print("❌ Email already registered")  # Debug log
        return Response({"error": "Email already registered"}, status=status.HTTP_400_BAD_REQUEST)
    
    data["password"] = make_password(data["password"])
    data["username"] = data.get("name", "")

    serializer = UserSerializer(data=data)
    
    if serializer.is_valid():
        user = serializer.save()
        print(f"✅ User created successfully: {user.email}")  # Debug log
        # Send verification email
        send_verification_email(user)
        return Response({
            "message": "User created successfully. Please check your email to verify your account.",
            "user": serializer.data
        }, status=status.HTTP_201_CREATED)
    else:
        print(f"❌ Validation errors: {serializer.errors}")  # Debug log

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def verify_email(request, token):
    try:
        user = AppUser.objects.get(email_verification_token=token)
        if user.is_email_verified:
            return Response({"message": "Email already verified"}, status=status.HTTP_200_OK)
        
        # Check if token is expired (24 hours)
        if user.email_verification_sent_at and timezone.now() - user.email_verification_sent_at > timedelta(hours=24):
            return Response({"error": "Verification link has expired"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.is_email_verified = True
        user.save()
        return Response({"message": "Email verified successfully"}, status=status.HTTP_200_OK)
    except AppUser.DoesNotExist:
        return Response({"error": "Invalid verification token"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def request_password_reset(request):
    email = request.data.get('email')
    try:
        user = AppUser.objects.get(email=email)
        user.password_reset_token = uuid.uuid4()
        user.password_reset_sent_at = timezone.now()
        user.save()
        send_password_reset_email(user)
        return Response({"message": "Password reset email sent"}, status=status.HTTP_200_OK)
    except AppUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def reset_password(request, token):
    try:
        user = AppUser.objects.get(password_reset_token=token)
        
        # Check if token is expired (1 hour)
        if user.password_reset_sent_at and timezone.now() - user.password_reset_sent_at > timedelta(hours=1):
            return Response({"error": "Password reset link has expired"}, status=status.HTTP_400_BAD_REQUEST)
        
        new_password = request.data.get('new_password')
        if not new_password:
            return Response({"error": "New password is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        user.password = make_password(new_password)
        user.password_reset_token = None
        user.password_reset_sent_at = None
        user.save()
        
        return Response({"message": "Password reset successfully"}, status=status.HTTP_200_OK)
    except AppUser.DoesNotExist:
        return Response({"error": "Invalid reset token"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def test_email(request):
    try:
        print(f"Using email: {settings.EMAIL_HOST_USER}")
        print(f"Using password: {settings.EMAIL_HOST_PASSWORD}")
        send_mail(
            'Test Email from Campus',
            'This is a test email to verify the email configuration.',
            settings.DEFAULT_FROM_EMAIL,
            [settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        return Response({"message": "Test email sent successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error details: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)