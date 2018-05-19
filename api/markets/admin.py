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
    list_display = ('id', 'sa_user', 'item', 'value', 'accepted', 'on_hold', 'created_at', )

admin.site.register(Offer, OfferAdmin)


class WaitingListSubscriptionAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('id', 'sa_user', 'item', 'created_at', )

admin.site.register(WaitingListSubscription, WaitingListSubscriptionAdmin)

class GalleryPhotoAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('image_tag','id', 'item', 'description', 'link', 'created_at', 'updated_at', 'photo_file_name', 'gallery_photo_small_url')

    readonly_fields = ('created_at','image_tag')

    def image_tag(self, obj):
  
        return '<img src="{}" width="150px" height="150px" />'.format(obj.gallery_photo_small_url)

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True
admin.site.register(GalleryPhoto, GalleryPhotoAdmin)