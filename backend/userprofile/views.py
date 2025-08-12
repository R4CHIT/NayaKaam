from django.shortcuts import render
from .serializers import *
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import ProviderDetails
from rest_framework.response import Response
from authentication.models import Role,UserRole
from rest_framework.views import APIView
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
from rest_framework.authentication import SessionAuthentication


class UpdateApiView(APIView):
    permission_classes=[IsAuthenticated]
    def patch(self, request, userId):
        try:
            profile = ProviderDetails.objects.get(user=userId)
        except ProviderDetails.DoesNotExist:
            return Response({'message': 'Profile not found'}, status=404)

        serializer = ProviderDetailSerializers(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Update Successfully"})
        return Response(serializer.errors, status=400)
    
class GetALLUserView(generics.GenericAPIView):
    permission_classes =[IsAuthenticated]
    def get(self, request):
        profile =ProviderDetails.objects.all()
        serializers = ProviderDetailSerializers(profile,many=True)
    
        return Response(serializers.data)
    