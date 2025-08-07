from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import ProviderDetails
from rest_framework.response import Response
from authentication.models import Role,UserRole
# Create your views here.

class ProviderDetailView(generics.CreateAPIView):
    serializer_class=ProviderDetailSerializers
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=self.request.user)
        provider_role, _ = Role.objects.get_or_create(name="provider")
        UserRole.objects.get_or_create(user=user, role=provider_role)

class ProviderDetailGetView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        profile = ProviderDetails.objects.get(user=request.user)
        serializers = ProviderDetailSerializers(profile)
        return Response(serializers.data)