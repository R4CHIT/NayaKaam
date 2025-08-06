from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Category
from .serializers import *
from rest_framework.response import Response
# Create your views here.
class Get_Category(generics.RetrieveAPIView):
    permission_classes=[IsAuthenticated]
    def get(self,request):
        category = Category.objects.all()
        serializers = GetCategorySerializers(category, many=True)
        return Response(serializers.data)