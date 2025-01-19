from django.db import models
from django.conf import settings

class Group(models.Model):
    """
    Model representing a group.
    Each group is created by a user.
    """
    name = models.CharField(max_length=200)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_groups')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class GroupMembership(models.Model):
    """
    Model representing a group membership.
    Each membership is associated with a user and a group.
    """
    ROLE_CHOICES = [
        ('ADMIN', 'Administrator'),
        ('MEMBER', 'Member'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='group_memberships')
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='memberships')
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='MEMBER')
    joined_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        unique_together = ['user', 'group']  # Ensure unique membership per user and group

    def __str__(self):
        return f"{self.user.username} - {self.group.name} ({self.role})"