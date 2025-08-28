from channels.db import database_sync_to_async
from .models import Notification
from .serializers import NotificationSerializer
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NotificationsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = str(self.scope["url_route"]["kwargs"]["user_id"])
        self.room_group_name = f"notifications_{self.user_id}"

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # Send existing unread notifications
        notifications = await self.get_unread_notifications()
        for n in notifications:
            await self.send(text_data=json.dumps(n))

    @database_sync_to_async
    def get_unread_notifications(self):
        notifications = Notification.objects.filter(recipient_id=self.user_id, is_read=False).order_by("-created_at")
        serializer = NotificationSerializer(notifications, many=True)
        return serializer.data

    @database_sync_to_async
    def get_notification_by_id(self, notification_id):
        notification = Notification.objects.get(id=notification_id)
        serializer = NotificationSerializer(notification)
        return serializer.data

    async def send_notification(self, event):
        notification_id = event.get("notification_id")
        if notification_id:
            data = await self.get_notification_by_id(notification_id)
            await self.send(text_data=json.dumps(data))
