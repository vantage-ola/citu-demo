from rest_framework import serializers
from .models import SpeakerProfile, SpeakerAvailability
from users.serializers import UserSerializer

class SpeakerAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SpeakerAvailability
        fields = '__all__'

class SpeakerProfileSerializer(serializers.ModelSerializer):
    availabilities = SpeakerAvailabilitySerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)

    class Meta:
        model = SpeakerProfile
        fields = '__all__'
