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

class GetUnreadNotification(generics.GenericAPIView):
    serializer_class = NotificationSearilizer
    permission_classes = [IsAuthenticated]

    def get(self,request):
        unreadnotification = len(Notification.objects.filter(receiver=request.user,is_read=False))
        return Response({'unreadnotification':unreadnotification})
    

class ReadAllNotification(generics.GenericAPIView):
    serializer_class = NotificationSearilizer
    permission_classes = [IsAuthenticated]

    def patch(self,request):
        Notification.objects.filter(receiver=request.user,is_read=False).update(is_read=True)
        return Response({'success'})
    
class ReadNotification(generics.GenericAPIView):
    serializer_class = NotificationSearilizer
    permission_classes = [IsAuthenticated]

    def patch(self,request,pk):
        notification = Notification.objects.get(receiver=request.user,id=pk)
        notification.is_read=True
        notification.save()
        return Response({'success'})