from rest_framework import serializers
from .models import PasswordStoreModel


class PasswordStoreModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordStoreModel
        fields = '__all__'
