from django.contrib import admin

# Register your models here.
from django.utils import timezone
from django.contrib import admin
from usertracking.models import *
from notifications.tasks import *
from django.utils import timezone
from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from import_export.admin import ImportExportActionModelAdmin

class APITrackingAdmin(admin.ModelAdmin):  
    save_on_top = True
    list_display = ('id', 'email', 'path', 'hijack', 'time_spent', 'status_code', 'ip', 'request_timestamp' )
    search_fields = ('email', 'ip', 'path', )
    list_filter = ('hijack', 'status_code')
    readonly_fields = ('request_timestamp',)


admin.site.register(APITracking, APITrackingAdmin)
