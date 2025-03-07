from django.db import models

class AppUser(models.Model): 

    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    bio = models.TextField()
    year = models.IntegerField()
    location = models.TextField()
    profile_picture = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
   
    def __str__(self):
        return self.name