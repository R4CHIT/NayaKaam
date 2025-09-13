from channels.generic.websocket import AsyncWebsocketConsumer
import json

class MessageConsumers(AsyncWebsocketConsumer):

    async def connect(self):
        sender = self.scope['url_route']['kwargs']['sender_id']
        receiver = self.scope['url_route']['kwargs']['receiver_id']
        self.room_group_name = f'message-{min(sender,receiver)}-{max(sender,receiver)}'
        await self.channel_layer.group_add(self.room_group_name,self.channel_name)
        await self.accept()
        print('conected')

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        await self.channel_layer.group_send(self.room_group_name,{
            'type':'message',
            'data':text_data_json
        })
        
    
    async def message(self,event):
        data = event['data']
        await self.send(text_data=json.dumps(data))