from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from users.views import UserViewSet
from speakers.views import SpeakerProfileViewSet, SpeakerAvailabilityViewSet
from groups.views import GroupViewSet, GroupMembershipViewSet
from events.views import EventViewSet, EventRegistrationViewSet, MockPaymentViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'speakers', SpeakerProfileViewSet)
router.register(r'speaker-availability', SpeakerAvailabilityViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'group-memberships', GroupMembershipViewSet)
router.register(r'events', EventViewSet)
router.register(r'event-registrations', EventRegistrationViewSet)
router.register(r'payments', MockPaymentViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]