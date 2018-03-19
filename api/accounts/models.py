from __future__ import unicode_literals
from django.db import models
from django.conf import  settings
import datetime
from django.utils import timezone
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Account(models.Model):
    
    name = models.CharField(max_length=255, blank=True, null=True)
    activated = models.BooleanField(default=False, blank=True)   
    created_at = models.DateTimeField(blank=True, null=True, default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True, default=timezone.now)   
    

    class Meta:
        app_label = 'accounts' 


class SAUser(models.Model):
    user = models.OneToOneField(User, editable = False, related_name = 'onf_user', null=True, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, related_name='sa_users' , null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=360, blank=True, null=True)
    last_name = models.CharField(max_length=360, blank=True, null=True)    
    email = models.CharField(max_length=255, blank=True, null=True)
    activated = models.BooleanField(default=False, blank=True)
    
    created_at = models.DateTimeField(blank=True, null=True, default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True, default=timezone.now)

    class Meta:
        app_label = 'accounts'   
