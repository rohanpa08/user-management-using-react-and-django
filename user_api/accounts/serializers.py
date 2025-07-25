from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class AuthUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'phone', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = super().create(validated_data)
        if password:
            user.set_password(password)
            user.username = validated_data.get('email', None)
            user.save()
        return user

