from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from users.views import UserViewSet
from speakers.views import SpeakerProfileViewSet, SpeakerAvailabilityViewSet
from groups.views import GroupViewSet, GroupMembershipViewSet
from events.views import EventViewSet, EventRegistrationViewSet, MockPaymentViewSet

from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'speakers', SpeakerProfileViewSet)
router.register(r'speaker-availability', SpeakerAvailabilityViewSet)
router.register(r'groups', GroupViewSet)
router.register(r'group-memberships', GroupMembershipViewSet)
router.register(r'events', EventViewSet)
router.register(r'event-registrations', EventRegistrationViewSet)
router.register(r'payments', MockPaymentViewSet)

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Swagger docs URL
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]