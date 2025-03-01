from django.db import models

# Create your models here.
class StudentUser(models.Model):
    studentnumber = models.IntegerField()

    first_name = models.CharField(max_length=50)

    last_name = models.CharField(max_length=50)

    def __str__(self):
        return (f"{self.last_name}, {self.first_name}")