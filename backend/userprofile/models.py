from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class ProviderDetails(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("User"),
        on_delete=models.CASCADE
    )
    fullname = models.CharField(max_length=50, blank=True, null=True)
    contactnumber = models.CharField(max_length=10)
    profilepic = models.ImageField(upload_to='provider_profiles/', blank=True, null=True)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    experience = models.PositiveIntegerField()
    price = models.PositiveIntegerField()
    description = models.CharField(max_length=200)
    jobtype = models.CharField(max_length=20)
    joineddate = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.fullname} ({self.user.username})"
