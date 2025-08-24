from django.shortcuts import render
from rest_framework import generics
from .serializers import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response 
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import *


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