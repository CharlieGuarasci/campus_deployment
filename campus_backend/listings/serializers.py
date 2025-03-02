from rest_framework import serializers
from .models import Listing

class ListingSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=True)  # Make image required


    class Meta:
        model = Listing
        fields = '__all__'  # Exports all fields