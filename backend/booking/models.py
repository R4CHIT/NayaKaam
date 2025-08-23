from django.db import models
from django.conf import settings

# Create your models here.

class Booking(models.Model):
    customer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="customer_bookings"
    )
    provider = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="provider_bookings"
    )
    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("confirmed", "Confirmed"),
            ("cancelled", "Cancelled"),
            ("completed", "Completed"),
        ],
        default="pending"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    booking_time = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)
