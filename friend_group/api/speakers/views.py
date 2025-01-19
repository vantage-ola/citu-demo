from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SpeakerProfile, SpeakerAvailability
from .serializers import SpeakerProfileSerializer, SpeakerAvailabilitySerializer

class SpeakerProfileViewSet(viewsets.ModelViewSet):
    queryset = SpeakerProfile.objects.all()
    serializer_class = SpeakerProfileSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SpeakerAvailabilityViewSet(viewsets.ModelViewSet):
    queryset = SpeakerAvailability.objects.all()
    serializer_class = SpeakerAvailabilitySerializer
    permission_classes = [IsAuthenticated]