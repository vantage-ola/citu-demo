from rest_framework import serializers
from .models import Group, GroupMembership
from users.serializers import UserSerializer

class GroupMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = GroupMembership
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    members = GroupMembershipSerializer(source='memberships', many=True, read_only=True)

    class Meta:
        model = Group
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')