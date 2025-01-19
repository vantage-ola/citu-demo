from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Converts User model instances to JSON format and vice versa.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_speaker', 'bio', 'profile_picture', 'created_at')
        read_only_fields = ('created_at',)  # 'created_at' is read-only and cannot be modified by the user