from rest_framework import serializers
from .models import *
from category.models import *
from category.serializers import *
from authentication.serializers import *
class ProviderDetailSerializers(serializers.ModelSerializer):
    profilepic = serializers.SerializerMethodField()
    jobtype = GetCategorySerializers(many=True, read_only=True)
    jobtype_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), many=True, write_only=True, required=False
    )

    class Meta:
        model = ProviderDetails
        fields = '__all__'

    def get_profilepic(self, obj):
        if obj.profilepic:
            return obj.profilepic.url  
        return None

    def create(self, validated_data):
        jobtypes = validated_data.pop('jobtype_ids', [])
        provider = super().create(validated_data)
        if jobtypes:
            provider.jobtype.set(jobtypes)
        return provider

    def update(self, instance, validated_data):
        jobtypes = validated_data.pop('jobtype_ids', None)
        provider = super().update(instance, validated_data)
        if jobtypes is not None:
            provider.jobtype.set(jobtypes)
        return provider
class ProviderDetailCategorySerializers(serializers.ModelSerializer):
    profilepic = serializers.SerializerMethodField()
    userId = serializers.PrimaryKeyRelatedField(source='user',read_only = True)
    class Meta:
        model = ProviderDetails
        exclude  = ('user',)
    def get_profilepic(self, obj):
        if obj.profilepic:
            return obj.profilepic.url  
        return None

class ProfileDetail(serializers.ModelSerializer):
     userId = serializers.PrimaryKeyRelatedField(source='user',read_only = True)
     class Meta:
        model = ProviderDetails
        fields = ['id','userId','profilepic',]