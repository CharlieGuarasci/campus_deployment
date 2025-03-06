from django.db import models
from listings.models import Listing
from appuser.models import AppUser

# Create your models here.
class Chat(models.Model):
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    buyer = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="buyer_chats")  
    seller = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="seller_chats") 

    def __str__(self):
        return (f"Chat on {self.listing.title} between {self.buyer.name} & {self.seller.name}")