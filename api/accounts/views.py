from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models import Avg, Q, Sum
from django.utils import timezone
from rest_framework import generics, status, views
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings
from accounts.serializers import *
from utils.email_verification_token_generator import make_token
from utils.utils import reset_password
from notifications.mailers import  PasswordResetNotification

class Signup(generics.CreateAPIView):
    """
    Signup API: returns a serialized account object or an error message.
    """
    serializer_class = SignupSerializer
    def post(self, request, format='json'):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(SAUserSerializer(user).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(generics.CreateAPIView):
    """
    A public API that gets an email as input and generates a password reset token and sends it as an email.
    """
    serializer_class = PasswordResetSerializer
    def post(self, request, format='json'):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(SAUserSerializer(user).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetNewPassword(generics.CreateAPIView):
    """
    A public API that takes a password rest token and a new password to reset the password for the associated user.
    """
    serializer_class = SetPasswordSerializer
    def post(self, request, format='json'):
        serializer = SetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(SAUserSerializer(user).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)