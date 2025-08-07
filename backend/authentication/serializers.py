from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import UserRole, Role

class UserSerializer(serializers.ModelSerializer):   
    class Meta:
        model = User
        fields = ('id', 'username', 'email',)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( 'username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        
        role, created = Role.objects.get_or_create(name="user")
        UserRole.objects.create(user=user, role=role)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')

class ChangePassword(serializers.Serializer):
    username = serializers.CharField(required=True)
    prevpassword = serializers.CharField(required=True)
    newpassword = serializers.CharField(required=True)

class PasswordReset(serializers.Serializer):
    email = serializers.CharField(required=True)

class ChangeresetPassword(serializers.Serializer):
    newpassword = serializers.CharField(required=True)

class GetUserRoleSerializer(serializers.ModelSerializer): 
    role = serializers.CharField(source='role.name')
    class Meta:
        model=UserRole
        fields = ('role',)