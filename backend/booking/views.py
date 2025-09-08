from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response 
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import *
from django.db.models.functions import TruncMonth
from django.db.models import Sum,Count
import calendar
from userprofile.models import ProviderDetails
from .pagination import *
from notification.models import Notification
from django.shortcuts import get_object_or_404
import time
from django.db.models import Q
# Create your views here.

class MakeBooking(generics.CreateAPIView):
    serializer_class = BookingSerializers
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        customer = self.request.user
        provider_id = self.request.data.get('provider')
        price = ProviderDetails.objects.get(user=provider_id)
        serializer.save(customer=customer,price=price.price)
        provider_user = get_object_or_404(User, id=1)

        Notification.objects.create(
            sender=customer,
            receiver=provider_user,  
            message="Booking Created",
            booking_time=self.request.data.get('booking_time'),
            location = self.request.data.get('location')
        )
        return super().perform_create(serializer)


class GetBooking(generics.ListAPIView):
    serializer_class = BookingSerializers
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination
    
    def get_queryset(self):
        return Booking.objects.filter(Q(provider=self.request.user)|Q(customer=self.request.user)).order_by('-id')
    
class getBookingSummary(generics.GenericAPIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        user=request.user
        booking= Booking.objects.filter(Q(provider = user)|Q(customer=user))
    
        completed = booking.filter(status = "completed").count()
        pending = booking.filter(status = "pending").count()
        confirmed = booking.filter(status = "confirmed").count()
        cancelled = booking.filter(status = "cancelled").count()
        data = {
            'completed':completed,
            'pending':pending,
            'confirmed':confirmed,
            'cancelled':cancelled,
        }
        return Response(data)
    
class GetMontlyEarning(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        booking = (
            Booking.objects.filter(provider=user)
            .annotate(month=TruncMonth('booking_time'))
            .values('month')
            .annotate(earning=Sum('price'))
            .order_by("month")
        )
        data = [
        {"month": item['month'].strftime("%B"), "earning": item['earning']}
        for item in booking
        ]

        return Response(data)
    
class GetMonthlyBooking(generics.GenericAPIView):
    permission_classes=[IsAuthenticated]
    def get(self,requst):
        user=requst.user
        booking = Booking.objects.filter(Q(provider=user)|Q(customer=user)).annotate(month=TruncMonth('booking_time')).values('month').annotate(count=Count('id')).order_by('month')
        data= [
            {"month":item['month'].strftime("%B"),"booking":item['count']}
            for item in booking
        ]
        return Response(data)
    
class UpdateOrderStatus(generics.UpdateAPIView):
    permission_classes=[IsAuthenticated]
    def patch(self, request,pk):
        status = request.data.get("status")
        booking=Booking.objects.filter(id=pk).update(status=status)

        if booking:
            return Response({"message": "Booking status updated!"}, status=200)
        else:
            return Response({"error": "Booking not found"}, status=404)
        
class getCompletedBooking(generics.ListAPIView):
    permission_classes=[IsAuthenticated]
    serializer_class = BookingSerializers
    pagination_class = CustomPagination
    
    def get_queryset(self):
        user = self.request.user
        return Booking.objects.filter(Q(provider=user)|Q(customer=user),status='completed')