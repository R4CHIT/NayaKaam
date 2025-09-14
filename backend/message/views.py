from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from .serializers import MessageSerializer,UserSerializer
from .models import Message
from django.db.models import Subquery,Q,OuterRef
from django.contrib.auth import authenticate, get_user_model
User = get_user_model()
# Create your views here.
class UserMessageIcon(generics.ListAPIView):
    
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.request.user.id

        other_users = User.objects.exclude(id=user_id)
        print(other_users)

        latest_messages = Message.objects.filter(
            Q(sender=OuterRef('pk'), recipient=user_id) |
            Q(sender=user_id, recipient=OuterRef('pk'))
        ).order_by('-id')

        return Message.objects.filter(
            id__in=Subquery(
                other_users.annotate(
                    last_msg_id=Subquery(latest_messages.values('id')[:1])
                ).values('last_msg_id')
            )
        ).order_by('-id')

class MessageView(generics.ListAPIView):
    serializer_class =MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user.id
        pk = self.kwargs.get('pk')
        return Message.objects.filter(Q(sender=user,recipient=pk)|Q(sender=pk,recipient=user))
 
class SearchUserView(generics.ListAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        if query:
            return User.objects.filter(
                Q(username__icontains=query) | Q(email__icontains=query)
            )
        return User.objects.none()

