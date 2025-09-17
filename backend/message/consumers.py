from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
import json
from .models import Message
from django.contrib.auth import get_user_model

User = get_user_model()


class MessageConsumers(AsyncWebsocketConsumer):

    async def connect(self):
        self.sender_id = self.scope['url_route']['kwargs']['sender_id']
        self.receiver_id = self.scope['url_route']['kwargs']['receiver_id']

        self.room_group_name = f'message-{min(self.sender_id,self.receiver_id)}-{max(self.sender_id,self.receiver_id)}'

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print("connected")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message_data = data.get("data", {}).get("message", {})

        content = message_data.get("content")
        attachment = message_data.get("attachment")

        
        msg = await self.save_message(self.sender_id, self.receiver_id, content, attachment)

        
        await self.channel_layer.group_send(self.room_group_name,{ 'type':'message', 'data':data })
    async def message(self, event):
        data = event["data"]
        await self.send(text_data=json.dumps(data))

    @database_sync_to_async
    def save_message(self, sender_id, receiver_id, content, attachment=None):
        sender = User.objects.get(id=sender_id)
        receiver = User.objects.get(id=receiver_id)
        return Message.objects.create(
            sender=sender,
            recipient=receiver,
            content=content,
            attachment=attachment if attachment else None
        )
