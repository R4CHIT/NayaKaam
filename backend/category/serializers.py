from rest_framework import serializers
from .models import Category


class GetCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields= ("category",)