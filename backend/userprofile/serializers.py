from rest_framework import serializers
from .models import *
from category.models import *
from category.serializers import *
class ProviderDetailSerializers(serializers.ModelSerializer):
    jobtype = GetCategorySerializers(many=True, read_only=True)
    jobtype_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True
    )
    class Meta:
        model = ProviderDetails
        fields = '__all__'

    def create(self, validated_data):
        jobtypes = validated_data.pop('jobtype_ids', [])
        provider = super().create(validated_data)
        provider.jobtype.set(jobtypes)
        return provider

    def update(self, instance, validated_data):
        jobtypes = validated_data.pop('jobtype_ids', None)
        provider = super().update(instance, validated_data)
        if jobtypes is not None:
            provider.jobtype.set(jobtypes)
        return provider