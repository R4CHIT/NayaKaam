from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
# Create your views here.

class ProviderDetailView(generics.CreateAPIView):
    serializer_class=ProviderDetailSerializers
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)