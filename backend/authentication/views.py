
from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer , ChangePassword,PasswordReset,ChangeresetPassword,GetUserRoleSerializer
from .permissions import HasRole
from rest_framework.permissions import IsAuthenticated as Isauthenticated
from django.contrib.auth import authenticate, get_user_model
User = get_user_model()
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.conf import settings
from django.utils.http import urlsafe_base64_encode
from django.utils.http import urlsafe_base64_decode
from .models import *

class UserView(generics.GenericAPIView):
    permission_classes = [Isauthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permisssion_classes = (AllowAny,)
    serializer_class = RegisterSerializer

class loginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        identifier = request.data.get('username') 
        password = request.data.get('password')

        user = None

        
        if '@' in identifier:
            try:
                user_obj = User.objects.get(email=identifier)
                user = authenticate(username=user_obj.username, password=password)
            except User.DoesNotExist:
                pass
        else:
            user = authenticate(username=identifier, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data
            })
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=401)
        
class changePassword(generics.GenericAPIView):
    serializer_class=ChangePassword
    def post (self,request,*args, **kwargs):
        username = request.data.get('username')
        prevpassword = request.data.get('prevpassword')
        newpassword = request.data.get('newpassword')

        user = authenticate(username=username, password=prevpassword)

        if user is not None :
            user.set_password(newpassword)
            user.save()
            return Response({"message":"Password Changed"},status=200)
        return Response({"message":"User not exist"},status=401)




class SendResetEmail(generics.GenericAPIView):
    serializer_class = PasswordReset

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = PasswordResetTokenGenerator().make_token(user)
            reset_url = f"http://localhost:5173/reset-password/{uid}/{token}"
            send_mail(
                "Reset Your Password",
                f"Click this link to reset your password: {reset_url}",
                settings.DEFAULT_FROM_EMAIL,
                [email],
            )
            return Response({"message": "Reset link sent!"}, status=200)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
class Changeresetpassword(generics.CreateAPIView):
    serializer_class= ChangeresetPassword
    def post(self,request,*args,**kargs):
        serializer = ChangeresetPassword(data=request.data)
        serializer.is_valid(raise_exception=True)
        uidb64 = request.data.get("uid")
        token = request.data.get("token")
        new_password = serializer.validated_data['newpassword']
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)

        except Exception:
            return Response({"error": "Invalid UID"}, status=401)
        
        token_generator = PasswordResetTokenGenerator()

        if not token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token"}, status=401)
        
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password has been reset successfully."}, status=200)
    
class GetUserRole(generics.RetrieveAPIView):
    permission_classes = [Isauthenticated]
    def get(self, request, userId):
        try:
            role = UserRole.objects.get(user=userId)
            serializer = GetUserRoleSerializer(role)
            return Response(serializer.data)
        except UserRole.DoesNotExist:
            return Response({"error": "Role not found"}, status=404)