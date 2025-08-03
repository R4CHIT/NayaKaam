from rest_framework import serializers
from .models import *
class ProviderDetailSerializers(serializers.ModelSerializer):
    class Meta:
        model=ProviderDetails
        fields="__all__"