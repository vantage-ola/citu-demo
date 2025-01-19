from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SpeakerProfile, SpeakerAvailability
from .serializers import SpeakerProfileSerializer, SpeakerAvailabilitySerializer

class SpeakerProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing speaker profiles.
    Only authenticated users can access this view.
    """
    queryset = SpeakerProfile.objects.all()
    serializer_class = SpeakerProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Automatically set the user field to the current user when creating a new speaker profile.
        """
        serializer.save(user=self.request.user)

class SpeakerAvailabilityViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing speaker availabilities.
    Only authenticated users can access this view.
    """
    queryset = SpeakerAvailability.objects.all()
    serializer_class = SpeakerAvailabilitySerializer
    permission_classes = [IsAuthenticated]