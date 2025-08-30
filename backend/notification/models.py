from django.db import models
from django.conf import settings

class Notification(models.Model):
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sender_notifications')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='receiver_notifications')
    message = models.CharField(max_length=200,null=True,blank=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=200,null=True,blank=True)
    booking_time = models.DateTimeField(null=True,blank=True)

    def __str__(self):
        return f"From {self.sender} to {self.receiver}: {self.message[:30]}"
