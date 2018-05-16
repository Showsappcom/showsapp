# from celery import shared_task
from usertracking.models import *
import dateutil
import dateutil.parser

### asynchronous task to record the api tracking objects in the database.
# @shared_task
def RecordAPITracking_Async(email, path ,request_timestamp,time_spent, status_code, ip):
    dt = dateutil.parser.parse(request_timestamp)

    APITracking.objects.create(email= email, path = path,request_timestamp=  dt,time_spent = time_spent, status_code= status_code, ip= ip )
    return "Set"