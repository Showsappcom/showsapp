from notifications.models import *
import datetime
from django.utils import timezone
from django.utils.crypto import salted_hmac
from django.utils.http import int_to_base36, base36_to_int
from django.conf import settings

from django.shortcuts import render
from django.http import HttpResponse
import datetime
from django.template import Context


def make_notification_setting_token(notification_setting):
    timestamp = timezone.now()
    value = (unicode(notification_setting.id) + unicode(notification_setting.notification_verb) + unicode(notification_setting.lluser.email) + unicode(timestamp))
    key_salt = "L0cAlLin3-notification_setting-verification-token-generator"
    hash = salted_hmac(key_salt, value).hexdigest()[::2]
    return hash

def slug2id(slug):
    return long(slug) - 110909

def id2slug(id):
    return id + 110909

