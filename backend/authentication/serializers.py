from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class UserSerializer(serializers.ModelSerializer):   
    class Meta:
        model = User
        fields = ('id', 'username', 'email','roles','auth_type')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
            auth_type='system'
        )
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class ChangePassword(serializers.Serializer):
    username = serializers.CharField(required=True)
    prevpassword = serializers.CharField(required=True)
    newpassword = serializers.CharField(required=True)

class PasswordReset(serializers.Serializer):
    email = serializers.CharField(required=True)

class ChangeresetPassword(serializers.Serializer):
    newpassword = serializers.CharField(required=True)

