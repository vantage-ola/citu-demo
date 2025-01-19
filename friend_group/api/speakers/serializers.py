from rest_framework import serializers
from .models import SpeakerProfile, SpeakerAvailability
from users.serializers import UserSerializer

class SpeakerAvailabilitySerializer(serializers.ModelSerializer):
    """
    Serializer for the SpeakerAvailability model.
    Converts SpeakerAvailability model instances to JSON format and vice versa.
    """
    class Meta:
        model = SpeakerAvailability
        fields = '__all__'

class SpeakerProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the SpeakerProfile model.
    Includes nested serialization for user and availabilities.
    """
    availabilities = SpeakerAvailabilitySerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = SpeakerProfile
        fields = '__all__'
