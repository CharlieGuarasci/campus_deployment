from django.db import models

class AppUser(models.Model): 

    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.TextField()
    year = models.IntegerField()

    def __str__(self):
        return self.name