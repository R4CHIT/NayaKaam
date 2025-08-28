from rest_framework import serializers
from .models import Notification
class NotificationSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.username',read_only = True)
    class Meta:
        model = Notification
        fields = '__all__'