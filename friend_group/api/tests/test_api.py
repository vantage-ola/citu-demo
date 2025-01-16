from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from speakers.models import SpeakerProfile
from groups.models import Group, GroupMembership
from events.models import Event, EventRegistration
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

class AuthenticationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )

    def test_obtain_jwt_token(self):
        url = reverse('token_obtain_pair')
        data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

class UserTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_list_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        url = reverse('user-list')
        data = {
            'username': 'newuser',
            'password': 'newpass123',
            'email': 'new@example.com'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class SpeakerTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='speaker',
            password='testpass123',
            is_speaker=True
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.speaker_profile = SpeakerProfile.objects.create(
            user=self.user,
            expertise='Testing',
            hourly_rate=100.00,
            location='Test City'
        )

    def test_list_speakers(self):
        url = reverse('speakerprofile-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_speaker(self):
        url = reverse('speakerprofile-detail', args=[self.speaker_profile.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class GroupTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='groupadmin',
            password='testpass123'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

    def test_create_group(self):
        url = reverse('group-list')
        data = {
            'name': 'Test Group',
            'description': 'Test Description',
            'created_by': self.user.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class EventTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='eventorganizer',
            password='testpass123'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.group = Group.objects.create(
            name='Test Group',
            created_by=self.user
        )

    def test_create_event(self):
        url = reverse('event-list')
        data = {
            'title': 'Test Eevent',
            'description': 'Test Deescription',
            'group': self.group.id,
            'date': '2025-01-20',
            'start_time': '14:00:00',
            'end_time': '16:00:00',
            'location': 'Test Location',
            'created_by': self.user.id,
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_list_events(self):
        url = reverse('event-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class EventRegistrationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='attendee',
            password='testpass123'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')

        self.group = Group.objects.create(
            name='Test Group',
            created_by=self.user
        )
        self.event = Event.objects.create(
            title='Test Event',
            group=self.group,
            date='2025-01-20',
            start_time='14:00:00',
            end_time='16:00:00',
            location='Test Location',
            created_by=self.user
        )

    def test_register_for_event(self):
        url = reverse('eventregistration-list')
        data = {
            'event': self.event.id,
            'user': self.user.id
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)