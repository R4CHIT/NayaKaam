from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from booking.models import Booking


class Notification(models.Model):
    NOTIFICATION_TYPES = [
        ("booking_created", "Booking Created"),
        ("booking_confirmed", "Booking Confirmed"),
        ("booking_cancelled", "Booking Cancelled"),
        ("booking_completed", "Booking Completed"),
        ("custom", "Custom Message"),
    ]
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="notifications")
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="sent_notifications")
    
    notification_type = models.CharField(max_length=50, choices=NOTIFICATION_TYPES, default="custom")
    message = models.TextField()
    
    booking = models.ForeignKey(Booking, on_delete=models.CASCADE, null=True, blank=True, related_name="notifications")
    
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"To {self.recipient.username}: {self.message[:30]}"
