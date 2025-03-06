from django.db import models
from listings.models import Listing
from appuser.models import AppUser
from chats.models import Chat

class Message(models.Model):
    
    content = models.TextField()
    image_url = models.CharField(max_length=255, blank=True, null=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    sender = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="messages")  
   

    def __str__(self):
        return self.content

