from rest_framework import serializers
from .models import Group, GroupMembership
from users.serializers import UserSerializer

class GroupMembershipSerializer(serializers.ModelSerializer):
    """
    Serializer for the GroupMembership model.
    Converts GroupMembership model instances to JSON format and vice versa.
    """
    user = UserSerializer(read_only=True)

    class Meta:
        model = GroupMembership
        fields = ['id', 'user', 'group', 'role', 'joined_at', 'is_active']
        read_only_fields = ['joined_at', 'user']

    def create(self, validated_data):
        """
        Set the current user as the user for the membership.
        """
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class GroupSerializer(serializers.ModelSerializer):
    """
    Serializer for the Group model.
    Includes nested serialization for members.
    """
    members = GroupMembershipSerializer(source='memberships', many=True, read_only=True)

    class Meta:
        model = Group
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')