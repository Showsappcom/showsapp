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
from notifications.mailers import WelcomeNotification, PasswordResetNotification


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
            token = make_token(sa_user.user, email, timestamp=None)

            account.activation_token = token
            account.save()

            WelcomeNotification(sa_user).send()

            return Response(AccountSerializer(account).data)
        except:
            sa_user.delete()
            account.delete()
            auth_user.delete()
            return Response({"message": "server error"}, status=500)


class PasswordResetView(views.APIView):
    """
    A public API that gets an email as input and generates a password reset token and sends it as an email

    Input:
    {
        "email":  email
    }

    Output: success or failure message with a status
    """

    def post(self, request, format=None):
        data = request.data
        try:
            email = data['email']
        except:
            return Response({"message": "An email address should be provided."}, status.HTTP_409_CONFLICT)    

        sa_users = SAUser.objects.filter(email=email)
        if not sa_users.exists():
            return Response({"message": "Could not find a user associated with provided email address."}, status.HTTP_409_CONFLICT)
        else:
            sa_user = sa_users[0]     
            if sa_user.activated==False:
                return Response({"message": "The user you are trying to reset the password for is not activated."}, status.HTTP_409_CONFLICT)
            else:
                reset_password(sa_user)
                PasswordResetNotification(sa_user).send()
                return Response({"message": "A password reset request has been sent successfully."}, status.HTTP_200_OK)


class SetNewPassword(views.APIView):
    """
    A public API that takes a password rest token and a new password to reset the password for the associated user.

    Input:
    {
        "password": password,
        "token": token
    }

    Output:
    {
       "email": email,
       "message": success message

    } or a failure message.
    """
    def post(self, request, format=None):
        data = request.data
        new_password = data['password']
        token = data['token']

        sa_users = SAUser.objects.filter(password_reset_token=token)
        if not sa_users.exists():
            return Response({"message": "The token you have provided does not exist or is invalid."}, status.HTTP_409_CONFLICT)
        else:
            sa_user = sa_users[0] 
            sa_user.password_reset_token = None
            sa_user.save()
            user = sa_user.user
            user.set_password(new_password)
            user.save()

            return Response({"email":user.email , "message": "The new password has been set successfully."}, status.HTTP_200_OK)
                