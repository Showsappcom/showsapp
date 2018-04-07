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


class Signup(views.APIView):

    def post(self, request, format=None):

        invalid_input = []

        data = request.data
        
        try:
            first_name = request.data['first_name']
        except:
            first_name = ""  

        try:
            last_name = request.data['last_name']
        except:
            last_name = ""
                 
        try:
            email = request.data['email']
        except:
            invalid_input.append("email")

        try:
            name = request.data['name']
        except:
            name = ""
   
        try:
            password = request.data['password']
        except:
            invalid_input.append("password")

        if len(invalid_input) > 0:
            return Response({"message": "Invalid input, insufficient information to build your account.",  "fields": invalid_input }, status=status.HTTP_400_BAD_REQUEST)

        ## check if the email already exists
        try:
            users_results = User.objects.filter(username__iexact=email)
            if users_results.exists():
                return Response({"message": "email already exists" },  status=status.HTTP_409_CONFLICT)
        except:
            pass        

        try:
            auth_user = User.objects.create(first_name = first_name, last_name= last_name, email = email, username = email, is_active= False)
            auth_user.set_password(password)
            auth_user.save()
            account = Account.objects.create(name=name)


            sa_user = SAUser.objects.create(first_name = first_name, last_name = last_name, user = auth_user, account = account, email=email)

            # create a token
            #token = make_token(sa_user.user, email, timestamp=None)

            #account.activation_token = token
            account.save()

            # WelcomeNotification_Async.delay(account.id)

            return Response(AccountSerializer(account).data)
        except:
            account.delete()
            return Response({"message": "server error"}, status=500)