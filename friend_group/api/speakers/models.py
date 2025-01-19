from django.db import models
from django.conf import settings

class SpeakerProfile(models.Model):
    """
    Model representing a speaker profile.
    Each speaker profile is associated with a user.
    """
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='speaker_profile')
    expertise = models.CharField(max_length=200)
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=200)
    available_online = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Speaker Profile"

class SpeakerAvailability(models.Model):
    """
    Model representing a speaker's availability.
    Each availability is associated with a speaker profile.
    """
    speaker = models.ForeignKey(SpeakerProfile, on_delete=models.CASCADE, related_name='availabilities')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=True)

    class Meta:
        unique_together = ['speaker', 'date', 'start_time', 'end_time']  # Ensure unique availability slots
