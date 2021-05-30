from tkinter.ttk import Style
from rest_framework import serializers

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Todo

# === User serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'}
    )
    
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        # exclude password from being read/displayed by serializer
        extra_kwargs = {
            'password': { 
                'write_only': True
            }
        }

    # override.
    def create(self, validated_data):
        """ Register new user """
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(style={'input_type': 'password'})

    # override. 
    def validate(self, attrs):
        """ Login in user """
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid login credentials")


# === Todo serializers
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'