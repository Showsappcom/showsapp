from rest_framework import serializers, exceptions
from accounts.models import *
from django.db.models import Q
from utils.email_verification_token_generator import make_token
from utils.utils import reset_password
from notifications.mailers import WelcomeNotification, PasswordResetNotification


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'name')


class SAUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SAUser
        fields = ('id', 'first_name', 'last_name', 'email')


class SignupSerializer(serializers.Serializer):
    email = serializers.CharField(allow_null=False, allow_blank=False, write_only=True)
    password = serializers.CharField(allow_null=False, allow_blank=False, write_only=True)
    name = serializers.CharField(allow_null=True, allow_blank=True, write_only=True, required=False)
    first_name = serializers.CharField(allow_null=True, allow_blank=True, write_only=True, required=False)
    last_name = serializers.CharField(allow_null=True, allow_blank=True, write_only=True, required=False)

    def create(self, validated_data):

        email = validated_data.get('email')
        password = validated_data.get('password')

        first_name = validated_data.get('first_name')
        last_name = validated_data.get('last_name')
        name = validated_data.get('name')

        users_results = User.objects.filter(username__iexact=email)
        if users_results.exists():
            raise exceptions.ValidationError('User already exists.')

        try:
            auth_user = User.objects.create(first_name=first_name, last_name=last_name, email=email, username=email)
            auth_user.set_password(password)
            auth_user.save()
            account = Account.objects.create(name=name)

            sa_user = SAUser.objects.create(first_name=first_name, last_name=last_name, user=auth_user, account=account, email=email)

            # create a token
            token = make_token(sa_user.user, email, timestamp=None)

            account.activation_token = token
            account.save()

            WelcomeNotification(sa_user).send()
        except:
            raise exceptions.APIException('Error saving the user.')

        return sa_user


class ActivateSerializer(serializers.Serializer):
    token = serializers.CharField(allow_null=False, allow_blank=False, write_only=True)

    def create(self, validated_data):

        token = validated_data.get('token')

        try:
            account = Account.objects.filter(activation_token=token)[0]
        except:
            raise exceptions.ValidationError('Could not find an account.')

        try:
            sa_user = account.sa_users.all()[0]

            # getting auth user
            user = sa_user.user

            account.activated = True
            account.activation_token = None
            account.save()
            sa_user.activated = True       
            sa_user.save()

            ### updating and activating the auth user
            user.is_active = True
            user.save()
        except:
            raise exceptions.APIException('Error saving the user.')

        return sa_user


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.CharField(allow_null=False, allow_blank=False, write_only=True, required=True)

    def create(self, validated_data):

        email = validated_data.get('email')

        users_results = User.objects.filter(username__iexact=email)
        if not users_results.exists():
            raise exceptions.ValidationError('User does not exist.')

        sa_user = users_results[0].sa_user

        if not sa_user.activated:
            raise exceptions.PermissionDenied("The user you are trying to reset the password for is not activated.")
        else:
            reset_password(sa_user)
            PasswordResetNotification(sa_user).send()

        return sa_user


class SetPasswordSerializer(serializers.Serializer):
    email = serializers.CharField(allow_null=False, allow_blank=False, write_only=True, required=True)
    token = serializers.CharField(allow_null=False, allow_blank=False, write_only=True, required=True)
    password = serializers.CharField(allow_null=False, allow_blank=False, write_only=True, required=True)

    def create(self, validated_data):

        email = validated_data.get('email')
        token = validated_data.get('token')
        password = validated_data.get('password')

        sa_users = SAUser.objects.filter(password_reset_token=token)
        if not sa_users.exists():
            raise exceptions.ValidationError('The token you have provided does not exist or is invalid.')

        sa_user = sa_users[0]

        if not sa_user.activated:
            raise exceptions.PermissionDenied("The user you are trying to reset the password for is not activated.")
        else:
            sa_user.password_reset_token = None
            sa_user.save()
            user = sa_user.user
            user.set_password(password)
            user.save()

        return sa_user
