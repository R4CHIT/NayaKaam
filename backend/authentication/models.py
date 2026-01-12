# authentication/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    roles = models.CharField(max_length=200, blank=True, null=True,default='customer')
    AUTH_CHOICES = (
        ('system', 'System'),
        ('google', 'Google'),
    )
    auth_type = models.CharField(max_length=20, choices=AUTH_CHOICES, default='system')
    def __str__(self):
        return self.username
    def has_role(self, role_name):
        if not self.roles:
            return False
        role_list = [r.strip().lower() for r in self.roles.split(",")]
        return role_name.lower() in role_list