import os
import django
import sys

# Set up Django environment
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from speakers.models import SpeakerProfile
from groups.models import Group, GroupMembership
from events.models import Event, EventRegistration, MockPayment
from django.utils import timezone
from datetime import timedelta

User = get_user_model()

def create_test_data():
    # Create regular users
    user1, created = User.objects.get_or_create(
        username='john_doe',
        defaults={
            'email': 'john@example.com',
            'is_speaker': False
        }
    )
    if created:
        user1.set_password('password123')
        user1.save()

    user2, created = User.objects.get_or_create(
        username='jane_doe',
        defaults={
            'email': 'jane@example.com',
            'is_speaker': False
        }
    )
    if created:
        user2.set_password('password123')
        user2.save()

    # Create a speaker user
    speaker_user, created = User.objects.get_or_create(
        username='expert_speaker',
        defaults={
            'email': 'speaker@example.com',
            'is_speaker': True
        }
    )
    if created:
        speaker_user.set_password('password123')
        speaker_user.save()

    # Create speaker profile
    speaker_profile, _ = SpeakerProfile.objects.get_or_create(
        user=speaker_user,
        defaults={
            'expertise': 'Python Programming',
            'hourly_rate': 100.00,
            'location': 'New York',
            'available_online': True
        }
    )

    # Create a group
    group, _ = Group.objects.get_or_create(
        name='Python Learners',
        defaults={
            'description': 'A group for Python enthusiasts',
            'created_by': user1
        }
    )

    # Add members to group
    GroupMembership.objects.get_or_create(
        user=user1,
        group=group,
        defaults={'role': 'ADMIN'}
    )

    GroupMembership.objects.get_or_create(
        user=user2,
        group=group,
        defaults={'role': 'MEMBER'}
    )

    # Create an event
    event, _ = Event.objects.get_or_create(
        title='Python for Beginners',
        defaults={
            'description': 'Introduction to Python programming',
            'group': group,
            'speaker': speaker_profile,
            'date': timezone.now().date() + timedelta(days=7),
            'start_time': timezone.now().time(),
            'end_time': (timezone.now() + timedelta(hours=2)).time(),
            'location': 'Online',
            'is_online': True,
            'meeting_link': 'https://meet.example.com/python-class',
            'max_participants': 20,
            'created_by': user1
        }
    )

    # Register users for event
    EventRegistration.objects.get_or_create(
        event=event,
        user=user2
    )

    # Create a mock payment
    MockPayment.objects.get_or_create(
        event=event,
        payer=user1,
        recipient=speaker_user,
        defaults={
            'amount': 200.00,
            'status': 'COMPLETED',
            'transaction_id': 'TEST123'
        }
    )

    print("Test data created successfully!")

if __name__ == '__main__':
    create_test_data()