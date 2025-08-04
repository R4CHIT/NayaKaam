from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import ProviderDetails
from rest_framework.response import Response
# Create your views here.

class ProviderDetailView(generics.CreateAPIView):
    serializer_class=ProviderDetailSerializers
    permission_classes = [IsAuthenticated]
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class ProviderDetailGetView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    
    def get(self,request):
        profile = ProviderDetails.objects.get(user=request.user)
        serializers = ProviderDetailSerializers(profile)
        return Response(serializers.data)