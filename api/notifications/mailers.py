from notifications.models import *
import datetime
from django.utils import timezone
from accounts.models import Account
from notifications.utils import *

class WelcomeNotification(NotificationBase):
    def __init__(self, user, template='./notifications/common/welcome.html', verb=Notification.Verb.WELCOME):
        self.user = user
        self.subject = "Please activate your account"
        self.need_settings = False
        super(WelcomeNotification, self).__init__(template, verb , user.user, level=Notification.LEVELS.INFO)

    def create_context(self):
        context = super(WelcomeNotification, self).create_context()
        context.update({'user': self.user, 'subject': self.subject, 'datetime': timezone.now() + datetime.timedelta(hours=12) })      
        return context

class PasswordResetNotification(NotificationBase):
    def __init__(self, user, template='./notifications/common/reset_password.html', verb=Notification.Verb.PASSWORD_RESET):
        self.user = user
        self.subject =  "Reset your password" 
        self.need_settings = False
        super(PasswordResetNotification, self).__init__(template, verb, user.user, level=Notification.LEVELS.SUCCESS)

    def create_context(self):
        context = super(PasswordResetNotification, self).create_context()
        context.update({ 'user': self.user, 'subject' : self.subject })      
        return context        