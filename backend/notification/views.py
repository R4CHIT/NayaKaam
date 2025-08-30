from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSearilizer
from rest_framework.response import Response
from booking.pagination import CustomPagination

class GetNotifications(generics.ListAPIView):
    serializer_class = NotificationSearilizer
    permission_classes = [IsAuthenticated]
    pagination_class =CustomPagination

    def get_queryset(self):
        return Notification.objects.filter(receiver=self.request.user).order_by('-id')
