from rest_framework import serializers

from .models import AppUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'name', 'email', 'year', 'username', 'bio', 'location', 'is_email_verified']
        extra_kwargs = {
            'bio': {'required': False},
            'location': {'required': False},
            'username': {'required': False},
            'year': {'required': False, 'default': 1}
        }

    def validate(self, data):
        print("\n=== Serializer Validation ===")
        print("Received data:", data)
        return data

    def create(self, validated_data):
        print("\n=== Serializer Create ===")
        print("Validated data before username generation:", validated_data)
        # Set username from name if not provided
        if 'username' not in validated_data:
            validated_data['username'] = validated_data.get('name', '').lower().replace(' ', '_')
            print("Generated username:", validated_data['username'])
        
        try:
            instance = super().create(validated_data)
            print("Successfully created user instance:", instance)
            return instance
        except Exception as e:
            print("❌ Error creating user in serializer:", str(e))
            raise

class UserCreateSerializer(UserSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['password']
