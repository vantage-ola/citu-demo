from django.db import models
from django.conf import settings

class Event(models.Model):
    """
    Model representing an event.
    Each event is associated with a group and optionally a speaker.
    """
    STATUS_CHOICES = [
        ('DRAFT', 'Draft'),
        ('SCHEDULED', 'Scheduled'),
        ('IN_PROGRESS', 'In Progress'),
        ('COMPLETED', 'Completed'),
        ('CANCELLED', 'Cancelled'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    group = models.ForeignKey('groups.Group', on_delete=models.CASCADE, related_name='events')
    speaker = models.ForeignKey('speakers.SpeakerProfile', on_delete=models.SET_NULL, null=True, related_name='events')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    location = models.CharField(max_length=200)
    is_online = models.BooleanField(default=False)
    meeting_link = models.URLField(blank=True, null=True)
    max_participants = models.PositiveIntegerField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='DRAFT')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_events')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class EventRegistration(models.Model):
    """
    Model representing an event registration.
    Each registration is associated with an event and a user.
    """
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='registrations')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='event_registrations')
    registered_at = models.DateTimeField(auto_now_add=True)
    attended = models.BooleanField(default=False)

    class Meta:
        unique_together = ['event', 'user']  # Ensure unique registration per event and user

    def __str__(self):
        return f"{self.user.username} - {self.event.title}"

class MockPayment(models.Model):
    """
    Model representing a mock payment.
    Each payment is associated with an event, payer, and recipient.
    """
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
        ('REFUNDED', 'Refunded'),
    ]

    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='payments')
    payer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments_made')
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='payments_received')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    transaction_id = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Payment {self.transaction_id} - {self.status}"