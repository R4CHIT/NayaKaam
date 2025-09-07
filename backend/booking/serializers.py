from rest_framework import serializers
from .models import *
class BookingSerializers(serializers.ModelSerializer):
    customername = serializers.CharField(source='customer',read_only=True)
    provider = serializers.CharField(read_only=True)
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ["customer", "status", "created_at"]