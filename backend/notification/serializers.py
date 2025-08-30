from rest_framework import serializers
from .models import Notification
class NotificationSearilizer(serializers.ModelSerializer):
    sender = serializers.CharField(read_only=True)
    receiver = serializers.CharField(read_only=True)
    class Meta:
        model = Notification
        fields = '__all__'