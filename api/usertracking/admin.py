from django.contrib.admin import ModelAdmin, site
from usertracking.models import APITracking


class APITrackingAdmin(ModelAdmin):
    save_on_top = True
    list_display = ('id', 'email', 'path', 'time_spent', 'status_code', 'ip', 'request_timestamp')
    search_fields = ('email', 'ip', 'path', )
    list_filter = ('status_code', )
    readonly_fields = ('request_timestamp',)


site.register(APITracking, APITrackingAdmin)
