from rest_framework import serializers
from .models import Event, EventRegistration, MockPayment

class EventRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventRegistration
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    registrations = EventRegistrationSerializer(many=True, read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        # Set created_by to the current user if not provided
        if 'created_by' not in validated_data:
            validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)

class MockPaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockPayment
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'transaction_id')