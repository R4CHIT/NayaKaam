from rest_framework import serializers
from .models import Message
from userprofile.models import ProviderDetails
from django.contrib.auth import get_user_model
User = get_user_model()


class ProviderSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(source='user.id')
    username = serializers.CharField(source='fullname')
    class Meta:
        model=ProviderDetails
        fields = ['id','profilepic','username',]

class UserSerializer(serializers.ModelSerializer):   
    class Meta:
        model = User
        fields = ('id', 'username',)
class MessageSerializer(serializers.ModelSerializer):
    sender_profile = serializers.SerializerMethodField()
    receiver_profile = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            'id',
            'sender',
            'recipient',
            'content',
            'status',
            'attachment',
            'timestamp',
            'read',
            'sender_profile',
            'receiver_profile'
        ]

    def get_sender_profile(self, obj):
        if obj.sender.roles == "provider":
            provider = obj.sender.providerdetails_set.first()  # use default related name
            if provider:
                return ProviderSerializer(provider).data
            return {}
        return UserSerializer(obj.sender).data

    def get_receiver_profile(self, obj):
        if obj.recipient.roles == "provider":
            provider = obj.recipient.providerdetails_set.first()
            if provider:
                return ProviderSerializer(provider).data
            return {}
        return UserSerializer(obj.recipient).data


class SidebarMessageSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'content', 'timestamp', 'read', 'user']

    def get_user(self, obj):
        """Return the other user (not the logged-in user)"""
        request_user = self.context['request'].user
        other_user = obj.recipient if obj.sender == request_user else obj.sender

        if other_user.roles == "provider":
            provider = other_user.providerdetails_set.first()
            if provider:
                return ProviderSerializer(provider).data
            return {}
        return UserSerializer(other_user).data