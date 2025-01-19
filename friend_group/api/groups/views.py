from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Group, GroupMembership
from .serializers import GroupSerializer, GroupMembershipSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing groups.
    Only authenticated users can access this view.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        """
        Add additional context to the serializer.
        """
        context = super().get_serializer_context()
        return context

class GroupMembershipViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing group memberships.
    Only authenticated users can access this view.
    """
    queryset = GroupMembership.objects.all()
    serializer_class = GroupMembershipSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        """
        Automatically set the user field to the current user when creating a new group membership.
        """
        serializer.save(user=self.request.user)