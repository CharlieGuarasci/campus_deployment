from django.db import models
from django.utils import timezone
import uuid

class AppUser(models.Model): 

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    year = models.IntegerField()
    username = models.CharField(max_length=255, blank=False)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    
    # Email verification fields
    is_email_verified = models.BooleanField(default=False)
    email_verification_token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    email_verification_sent_at = models.DateTimeField(null=True, blank=True)
    
    # Password reset fields
    password_reset_token = models.UUIDField(null=True, blank=True, unique=True)
    password_reset_sent_at = models.DateTimeField(null=True, blank=True)
   
    def __str__(self):
        return self.name