from notifications.models import *
import datetime
from django.utils import timezone
from accounts.models import Account
from notifications.utils import *

class WelcomeNotification(NotificationBase):
    def __init__(self, user, template='./notifications/common/template.html', verb=Notification.Verb.NOTIFICATION_VERB):
        self.user = user
        self.subject = "Subject"
        self.need_settings = False
        super(WelcomeNotification, self).__init__(template, verb , user.user, level=Notification.LEVELS.INFO)

    def create_context(self):
        context = super(WelcomeNotification, self).create_context()
        context.update({ 'user': self.user, 'subject' : self.subject, 'datetime': timezone.now() + datetime.timedelta(hours=12) })      
        return context