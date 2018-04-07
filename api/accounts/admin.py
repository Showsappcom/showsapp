from django.contrib import admin

# Register your models here.
from django.utils import timezone
from django.contrib import admin
from accounts.models import *
from django.utils import timezone
from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple

import json
from django.conf import  settings


# Register your models here.
class AccountAdmin(admin.ModelAdmin):  
    save_on_top = True
    list_display = ('name', 'activated', 'created_at', )
    search_fields = ('name', )
    list_filter = ('activated', 'created_at', ) 

admin.site.register(Account, AccountAdmin)


class SAUserAdmin(admin.ModelAdmin):  
    save_on_top = True
    list_display = ('email', 'first_name', 'last_name', 'created_at', )


admin.site.register(SAUser, SAUserAdmin)