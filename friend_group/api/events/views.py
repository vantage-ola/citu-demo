from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Event, EventRegistration, MockPayment
from .serializers import EventSerializer, EventRegistrationSerializer, MockPaymentSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context
class EventRegistrationViewSet(viewsets.ModelViewSet):
    queryset = EventRegistration.objects.all()
    serializer_class = EventRegistrationSerializer
    permission_classes = [IsAuthenticated]

class MockPaymentViewSet(viewsets.ModelViewSet):
    queryset = MockPayment.objects.all()
    serializer_class = MockPaymentSerializer
    permission_classes = [IsAuthenticated]