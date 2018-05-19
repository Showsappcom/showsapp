from django.contrib.auth import logout
from django.utils import timezone
from usertracking.models import *
from usertracking.tasks import *
from django.utils.deprecation import MiddlewareMixin

### Extracts the client IP address from the request object.
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

### API Tracking middlware: it processes all requests and responses to record every single api call
### for statistical and maintenance purposes.
### This middleware currently writes the log to the same database of the app itself, later on it will be 
### moved to write to external database (recommended rethink DB) for performance reasons.

class APITrackingMiddleWare(MiddlewareMixin):
    # Check if client IP is allowed
    def process_request(self, request):    
        request.time = timezone.now()
        return None

    def process_response(self, request, response):

        try:
            time = request.time
        except:
            time = timezone.now()

        execution_time = (timezone.now() - time).total_seconds() * 1000
        request_timestamp = time
        try:
            email = request.user.email
            if not request.user.is_active:
                logout(request)
        except:
            email = ''

        try:
            ip = get_client_ip(request)
        except:
            ip = '0.0.0.0'
        
        if request.path.startswith('/api/'):
            RecordAPITracking_Async(email, request.path,str(request_timestamp), execution_time, response.status_code, ip)

        return response        