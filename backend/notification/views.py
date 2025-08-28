# notifications/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notification
from .serializers import NotificationSerializer
from booking.models import Booking
from django.contrib.auth import get_user_model

User = get_user_model()

class CreateBookingNotification(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, provider_id):
        provider = User.objects.get(id=provider_id)

        # Optionally, create a booking (or use existing one)
        booking = Booking.objects.create(
            user=request.user,
            provider=provider,
            status="created"
        )

        # Create Notification instance
        notification = Notification.objects.create(
            recipient=provider,
            sender=request.user,
            notification_type="booking_created",
            message=f"{request.user.username} booked you!",
            booking=booking
        )

        # Send notification via WebSocket
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"notifications_provider_{provider.id}",
            {
                "type": "send_notification",  # maps to consumer method
                "notification": notification
            }
        )

        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

class ProviderNotifications(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        provider = request.user
        notifications = Notification.objects.filter(recipient=provider).order_by("-created_at")
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)