from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Account(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    activated = models.BooleanField(default=False, blank=True)
    activation_token = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True, default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True, default=timezone.now)   

    class Meta:
        app_label = 'accounts'

    def __str__(self):
        return "%s - %s" %(self.id, self.name)  

class SAUser(models.Model):
    user = models.OneToOneField(User, editable=True, related_name='sa_user', null=True, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, related_name='sa_users', null=True, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=360, blank=True, null=True)
    last_name = models.CharField(max_length=360, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    activated = models.BooleanField(default=False, blank=True)
    password_reset_token = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True, default=timezone.now)
    updated_at = models.DateTimeField(blank=True, null=True, default=timezone.now)

    class Meta:
        app_label = 'accounts'

    def __str__(self):
        return "%s - %s %s (%s)" %(self.id, self.first_name, self.last_name, self.email)    
