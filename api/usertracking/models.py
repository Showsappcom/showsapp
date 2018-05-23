from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

class APITrackingManager(models.Manager):
    def public(self):
        return self.all()

class APITracking(models.Model):
    email = models.CharField(max_length=1000, blank=True, null=True)
    path = models.CharField(max_length=1000, blank=True, null=True)
    request_timestamp = models.DateTimeField(blank=True, null=True, default=timezone.now)
    time_spent = models.FloatField(default=0, blank=True, null=True)
    status_code = models.CharField(max_length=255, blank=True, null=True)
    ip = models.CharField(max_length=1000, blank=True, null=True)
    objects = APITrackingManager()    
    class Meta:
        app_label = 'usertracking'