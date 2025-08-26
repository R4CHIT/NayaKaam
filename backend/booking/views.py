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
# Create your views here.

class MakeBooking(generics.CreateAPIView):
    serializer_class = BookingSerializers
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        id = self.request.user
        serializer.save(customer=id,provider=id)
        return super().perform_create(serializer)


class GetBooking(generics.RetrieveAPIView):
    serializer_class = BookingSerializers
    permission_classes = [IsAuthenticated]

    def get(self,request):
        user = request.user
        booking=Booking.objects.filter(customer = user )
        serializers = BookingSerializers(booking,many=True)
        return Response(serializers.data)
    
class getBookingSummary(generics.GenericAPIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        user=request.user
        booking= Booking.objects.filter(provider = user)
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
        booking = Booking.objects.filter(provider=user).annotate(month=TruncMonth('booking_time')).values('month').annotate(count=Count('id')).order_by('month')
        data= [
            {"month":item['month'].strftime("%B"),"booking":item['count']}
            for item in booking
        ]
        return Response(data)