from channels.generic.websocket import AsyncWebsocketConsumer
import json

class NotificationConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        id = self.scope['url_route']['kwargs']['user_id']
        self.id = id 
        self.room_group_name = f'notification-{id}'
        await self.channel_layer.group_add(self.room_group_name,self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json.get('message', '')
        sender = text_data_json.get('sender')

        print("Received:", message, "from:", sender)
        await self.channel_layer.group_send(self.room_group_name,{
            'type':'notification',
            'message':message,
            'sender':sender,
        })
        
    
    async def notification(self,event):
        message = event['message']
        sender = event['sender']
        await self.send(text_data=json.dumps({
            'message':message,
            'sender':sender,
        }))