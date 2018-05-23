from django.contrib import admin
from notifications.models import *
from django.utils.html import format_html
from import_export.admin import ImportExportActionModelAdmin

class NotificationAdmin(admin.ModelAdmin):   	
    save_on_top = True
    list_display = ('level','recipient','recipient_account','verb','timestamp','read','read_at', 'tag')
    list_filter = ('verb', 'level' )
    list_per_page =20
    search_fields = ('recipient__email',)
    readonly_fields = ('recipient', 'rendered_email')
     

    def rendered_email(self, obj):
  
        return '<div>%s</div>' %obj.description

    rendered_email.email = 'Image'
    rendered_email.allow_tags = True

    def recipient_account(self, obj):
    	return obj.recipient.sauser.account

admin.site.register(Notification, NotificationAdmin)


class DelayedNotificationRefAdmin(admin.ModelAdmin): 
    save_on_top = True
    list_display = ('account','timestamp','token', 'task_ref', 'description', 'due_date')
    readonly_fields = ('account',)
    list_per_page =20
     
    def recipient_account(self, obj):
        return obj.recipient.lluser.account

admin.site.register(DelayedNotificationRef, DelayedNotificationRefAdmin)


class UserEmailNotificationSettingsAdmin(admin.ModelAdmin):
    save_on_top = True
    list_display = ('notification_verb', 'enable','sauser', 'created_at', 'updated_at')
    list_filter = ('created_at','notification_verb','enable', )
    readonly_fields = ('sauser',)
    list_per_page =20
   
admin.site.register(UserEmailNotificationSettings, UserEmailNotificationSettingsAdmin)