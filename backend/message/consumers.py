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




#Audio/video call
class CallConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender_id = int(self.scope['url_route']['kwargs']['sender_id'])
        self.receiver_id = int(self.scope['url_route']['kwargs']['receiver_id'])

        self.room_group_name = f'call-{min(self.sender_id, self.receiver_id)}-{max(self.sender_id, self.receiver_id)}'

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        
       
        await self.send(text_data=json.dumps({
            'type': 'connection',
            'data': {'message': 'Connected'}
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data):
        data_json = json.loads(text_data)
        event_type = data_json.get('type')
        rtc_message = data_json.get('data', {}).get('rtcMessage', {})

        print("Received event:", data_json)
        

        if event_type == 'call':
            
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'call_received',
                    'data': {
                        'caller': self.sender_id,
                        'rtcMessage': rtc_message
                    }
                }
            )

        elif event_type == 'answer_call':
            
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'call_accepted',  # frontend expects this type
                    'data': {
                        'acceptedBy': self.sender_id,
                        'rtcMessage': rtc_message
                    }
                }
            )

        elif event_type == 'ICEcandidate':
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'ICEcandidate',
                    'data': {
                        'rtcMessage': rtc_message
                    }
                }
            )
        elif(event_type == 'call_accepted'):
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'call_accepted',
                    'data': {
                        'message':" your call has been accepted"
                    }
                }
            )

    
    async def message(self, event):
        data = event["data"]
        print("sending data",data)
        await self.send(text_data=json.dumps(data))
    async def call_received(self, event):
        await self.send(text_data=json.dumps({
            'type': 'call_received',
            'data': event['data']
        }))

    async def call_accepted(self, event):
        await self.send(text_data=json.dumps({
            'type': 'call_accepted',
            'data': event['data']
        }))

    async def ICEcandidate(self, event):
        await self.send(text_data=json.dumps({
            'type': 'ICEcandidate',
            'data': event['data']
        }))