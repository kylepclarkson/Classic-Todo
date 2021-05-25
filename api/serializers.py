

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .models import Todo

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField(
        style = {
            'input_type': 'password',
        },
        write_only=True,
    )


    # def validate(self, data):
    #     print('validate called')
    #     username = data['username']
    #     password = data['password']

    #     if username and password:
    #         user = authenticate(username=username, password=password)

    #         if not user:
    #             raise serializers.ValidationError({
    #                 'error': 'Invalid login credentials!'
    #             })
    #     else:
    #         raise serializers.ValidationError({
    #             'error': 'Must enter a username and password!'
    #         })
    #     return data


class RegistrationSerializer(serializers.ModelSerializer):

    # username = serializers.CharField()    
    password2 = serializers.CharField(
        style = {
            'input_type': 'password',
        },
        write_only=True,
    )

    class Meta:
        model = User
        fields = ['username', 'password', 'password2']
        # Hide password field. 
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # override save 
    def save(self):
        # check that passwords match.
        password = self.validated_data['password']
        password2 = self.validated_data['password2']

        if password != password2:
            raise serializers.ValidationError({
                'password': ['Passwords must match!']
            })

        # create user
        user = User(
            username=self.validated_data['username'],
            password=self.validated_data['password']
        )
        user.save()
        return user

class TodoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Todo

        fields = ['id', 'text', 'completed']

