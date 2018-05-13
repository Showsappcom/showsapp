from rest_framework_jwt.serializers import JSONWebTokenSerializer
from django.contrib.auth.models import  User
from rest_framework.serializers import Serializer
import rest_framework.serializers as serializers
from django.contrib.auth import authenticate, get_user_model
from accounts.utils import jwt_payload_handler

import jwt

from calendar import timegm
from datetime import datetime, timedelta

from django.contrib.auth import authenticate, get_user_model
from django.utils.translation import ugettext as _
from rest_framework import serializers

from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.compat import get_username_field, PasswordField
from rest_framework_jwt.utils import jwt_encode_handler

class CustomJWTSerializer(JSONWebTokenSerializer):
    username_field = 'username'

    def validate(self, attrs):
        print("here ---------------->")
        password = attrs.get("password")
        user_obj = User.objects.filter(email=attrs.get("username").lower()).first() or User.objects.filter(username=attrs.get("username")).first()
        print(user_obj)

        if user_obj is not None:
            credentials = {
                'username':user_obj.username,
                'password': password
            }
            if all(credentials.values()):
                user = authenticate(**credentials)
                if user:
                    if not user.is_active:
                        msg = 'User account is disabled.'
                        raise serializers.ValidationError(msg)

                    payload = jwt_payload_handler(user)

                    return {
                        'token': jwt_encode_handler(payload),
                        'user': user
                    }
                else:
                    msg = 'Unable to log in with provided credentials.'
                    raise serializers.ValidationError(msg)

            else:
                msg = 'Must include  username and password'
                msg = msg.format(username_field=self.username_field)
                raise serializers.ValidationError(msg)

        else:
            msg = 'Account with this email/username does not exists'
            raise serializers.ValidationError(msg)
