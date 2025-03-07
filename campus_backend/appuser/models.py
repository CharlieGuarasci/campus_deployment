from django.db import models

class AppUser(models.Model): 

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    year = models.IntegerField()
    username = models.CharField(max_length=255, blank=False)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
   
    def __str__(self):
        return self.name