import jwt
import warnings
from calendar import timegm
from datetime import datetime
from django.conf import settings
from rest_framework_jwt.compat import get_username, get_username_field
from rest_framework_jwt.settings import api_settings
from .serializers import AccountSerializer, SAUserSerializer

def jwt_payload_handler(user, hijack=False):
    username_field = get_username_field()
    username = get_username(user)

    user.last_login = datetime.now()
    user.save()

    warnings.warn(
        'The following fields will be removed in the future: '
        '`email` and `user_id`. ',
        DeprecationWarning
    )

    payload = {
        'user_id': user.pk,
        'email': user.email,
        'exp': datetime.utcnow() + api_settings.JWT_EXPIRATION_DELTA
    }

    payload[username_field] = username


    if api_settings.JWT_AUDIENCE is not None:
        payload['aud'] = api_settings.JWT_AUDIENCE

    if api_settings.JWT_ISSUER is not None:
        payload['iss'] = api_settings.JWT_ISSUER

    return payload


def jwt_response_payload_handler(token, user=None, request=None):
    print(request.path)
    if request.path == '/api/v1/accounts/token-verify/':
        return {
            'token': token
        }
    else:
        return {
            'token': token,
            'user': SAUserSerializer(user.sa_user).data
        }