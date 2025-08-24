from rest_framework import serializers
from .models import *
class BookingSerializers(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'
        read_only_fields = ["customer", "status", "created_at"]