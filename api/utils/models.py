import os
from django.utils import timezone
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.db import models
from rest_framework import pagination
from utils.utils import *
from rest_framework import status, views, generics
from rest_framework.response import Response

class FailedEmails(models.Model):
    sender = models.EmailField("Sender")
    recipient = models.TextField("Recipient")
    content = models.TextField("Email Content")
    timestamp = models.DateTimeField(auto_now_add=True)
    excepion_type_and_value = models.TextField("Excepion Type and Value")
    exception_traceback = models.TextField("TraceBack")

    class Meta:
        app_label = 'utils'

    def __unicode__(self):
        return self.recipient

#############################################################################################

class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 200
    page_size_query_param = 'page_size'

#############################################################################################

class Calendar(models.Model):
    tick = models.DateTimeField(blank=True, null=True, default=timezone.now)
    class Meta:
        app_label = 'utils'    

class CustomQueryBase(object):
    sql = models.TextField(blank=True, null=True)
    def __init__(self, *args, **kw):    
        return None

    def query_the_db(self):        
        result = customQuery(self.sql)
        return result        

    def to_json(self):
        return array_to_dict(self.query_the_db(), self.fields)

