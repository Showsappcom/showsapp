import datetime
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.db import models
from django.utils.timezone import utc
from utils.utils import Enumeration
from accounts.models import Account, SAUser
from django.template import loader
from django.conf import settings
from utils import mail_message
from django.utils.crypto import salted_hmac
from django.utils.http import int_to_base36, base36_to_int


try:
    from django.utils import timezone
    now = timezone.now
except ImportError:
    now = datetime.datetime.now

#############################################################################################

class Notification(models.Model):

    # enumerate notification verbs
    Verb = Enumeration(
        'welcome',
        'password reset',
        'new offer',
        'offer resolve'

    )

    NOTIFICATION_VERB = (
        (Verb.WELCOME, ('welcome')),
        (Verb.PASSWORD_RESET, ('password reset')),
        (Verb.NEW_OFFER, ('new offer')),
        (Verb.OFFER_RESOLVE, ('offer resolve')),
    )

    LEVELS = Enumeration('success', 'info', 'warning', 'error')

    level = models.PositiveSmallIntegerField(choices=LEVELS.choices, null=True)
    recipient = models.ForeignKey(User, blank=False, related_name='notifications', on_delete=models.CASCADE)
    verb = models.IntegerField(choices=NOTIFICATION_VERB, db_index=True)
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(default=now)
    read = models.BooleanField(default=False, blank=True)        
    read_at = models.DateTimeField(blank=True, null=True)       
    token = models.CharField(db_index=True, max_length=360, blank=True, null=True)
    tag = models.CharField(db_index=True, max_length=360, blank=True, null=True)


    class Meta:
        app_label = 'notifications'  
        ordering = ('-timestamp', )


class DelayedNotificationRef(models.Model):            
    account = models.ForeignKey(Account, related_name="delayed_notification_refs", null=True, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(default=now)   
    token = models.CharField(db_index=True, max_length=360, blank=True, null=True)
    task_ref = models.CharField(db_index=True, max_length=360, blank=True, null=True)
    description = models.CharField(db_index=True, max_length=512, blank=True, null=True)
    due_date = models.DateTimeField(null=True, blank=True) 

    class Meta:
        app_label = 'notifications'  
        ordering = ('-timestamp', )


#############################################################################################

class UserEmailNotificationSettings(models.Model):
    
    DESCRIPTIONS = {

    }
    
    notification_verb = models.IntegerField(choices = Notification.NOTIFICATION_VERB, db_index = True, null=True, blank=True)        
    sauser = models.ForeignKey(SAUser, related_name="notifications_settings", null=True, on_delete=models.CASCADE)
    enable = models.NullBooleanField()
    token = models.CharField(db_index=True, max_length=360, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'notifications'
        verbose_name_plural = 'Notification Settings'

    def verb_display(self):
        return self.DESCRIPTIONS[self.get_notification_verb_display()]

#############################################################################################

def user_has_setting_enabled(sauser, verb):
    unss = UserEmailNotificationSettings.objects.filter(sauser=sauser, notification_verb=verb)    
    if unss.count()>0:
        uns = unss[0]
        if uns.enable:
            return True
        else:
            return False
    else:
        return True

def make_notification_token(notification):
    timestamp = timezone.now()
    value = (str(notification.id) + str(notification.recipient.email) + str(timestamp))
    key_salt = "5#05A99-notification-tracking-token-generator"
    hash = salted_hmac(key_salt, value).hexdigest()[::2]
    return hash


#############################################################################################

class NotificationBase(object):
    def __init__(self, template, verb, recipient, level, **kwargs):
        self.template = template
        self.verb = verb
        self.recipient = recipient
        self.level = level
        if 'from_name' in kwargs :
            self.from_name = kwargs['from_name']
        else:
            self.from_name = None    


        if 'token' in kwargs :
            self.token = kwargs['token']
        else:
            self.token = None   


        self.email_base_template = './notifications/emails/notification_email_wrapper.html'
        self.notice_base_template = './notifications/onsite/notification_onsite_wrapper.html'

    def get_notification_token(self):
        setting = UserEmailNotificationSettings.objects.filter(sauser=self.user,  notification_verb=self.verb)
        if setting.exists():
            return setting[0].token
        else:
            return ''    


    def create_context(self):
        # put standard stuff into the context
        return {
            'notification_token': self.get_notification_token(),
            'recipient': self.recipient,
        }

    def create_message(self, context):
        context['token'] = self.token
        # render and return the message
        return loader.render_to_string(self.template, context)

    def send_notification(self, message, **kwargs):     

        if hasattr(self, 'tag'):
            tag= self.tag
        else:
            tag = None    
        newnotify = Notification(
            level = self.level,
            recipient=self.recipient,
            verb=self.verb,   
            tag = tag,         
            description=kwargs.pop('description', None),
            timestamp=kwargs.pop('timestamp', datetime.datetime.utcnow().replace(tzinfo=utc)),
        )    
        newnotify.save()

        if newnotify.token ==None:
            newnotify.token = make_notification_token(newnotify)   
            self.token = newnotify.token      
            newnotify.save()

        return newnotify


    def send_email(self, message, recipient, subject='Showsapp Notifications', **kwargs):    
        email_content = message

        if type(recipient) is not list:
            recipient = [recipient]
        hash='support'    
        if 'hash' in kwargs:
            hash = kwargs['hash'] 
            if hash==None or hash=='':
                hash = 'app' 

        try:
            reply_to = [self.reply_to]
        except:
            reply_to = ['Showsapp Messaging <info@showsapp.com>']

        if 'cc' in kwargs:
            cc=kwargs['cc']
        else:
            cc=[]    
   
        if self.from_name:
            from_email = self.from_name + settings.DEFAULT_EMAIL_ADDRESS
        else:
            from_email = settings.DEFAULT_FROM_EMAIL

        if settings.DEBUG == True:
            from_email = "TEST | %s" %(from_email)

        email = mail_message.SAEmailMessage(subject, email_content, from_email, recipient, reply_to=reply_to, cc=cc)

    
        try:
            email.attach(self.attachment_name, self.attachment, "application/pdf")
        except:
            pass

        email.content_subtype = 'html'

        email.send()

    def send(self, extra_context=None, **kwargs):
        ### of the notification is tagged try to make sure it's not sent before
        if hasattr(self, 'tag'):
            if self.tag != '':
                previous_notifications = Notification.objects.filter(recipient=self.recipient, tag=self.tag)
                if previous_notifications.exists():
                    return None
        context = self.create_context()
        if self.need_settings:
            setting_enabled = user_has_setting_enabled(self.user, self.verb)

            if not (setting_enabled):
                return False
        # send the notification
        context.update({ 'base_template' : self.notice_base_template })
        message = self.create_message(context)        
        self.send_notification(message,description=message, **kwargs)
  

        # send the email
        context.update({ 'base_template' : self.email_base_template })
        message = self.create_message(context)
        try:
            cc = self.cc
        except:
            cc = None

        if cc != None:
            self.send_email(message, self.recipient.email, self.subject, cc=self.cc, **kwargs)
        else: 
            self.send_email(message, self.recipient.email, self.subject, **kwargs)     

