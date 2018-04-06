from rest_framework import serializers
from accounts.models import *
from django.db.models import Q


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name')

class SAUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SAUser
        fields = ('id', 'first_name', 'last_name', 'email')
