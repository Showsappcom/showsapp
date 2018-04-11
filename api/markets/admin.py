from django.contrib import admin
from django.utils import timezone
from django.contrib import admin
from markets.models import *
from django.utils import timezone
from django import forms
from django.contrib.admin.widgets import FilteredSelectMultiple
from django.conf import  settings

class ItemAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('name', 'sa_user', 'price', 'good_faith_money', 'slug', 'created_at', )

admin.site.register(Item, ItemAdmin)


class OfferAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('id', 'sa_user', 'item', 'value', 'created_at', )

admin.site.register(Offer, OfferAdmin)


class WaitingListSubscriptionAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('id', 'sa_user', 'item', 'created_at', )

admin.site.register(WaitingListSubscription, WaitingListSubscriptionAdmin)