from rest_framework import serializers

from .models import StudentUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentUser
        fields = '__all__'
