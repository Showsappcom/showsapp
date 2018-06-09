from notifications.models import Notification
import datetime
from django.utils import timezone
from accounts.models import Account
from notifications.utils import *


class WelcomeNotification(NotificationBase):
    def __init__(self, user, for_offer, template='./notifications/common/welcome.html', verb=Notification.Verb.WELCOME):
        self.user = user
        self.for_offer = for_offer
        if for_offer:
            self.subject = "Verify your email to send the offer."
        else:         
            self.subject = "Please activate your account"

        self.need_settings = False
        super(WelcomeNotification, self).__init__(template, verb , user.user, level=Notification.LEVELS.INFO)

    def create_context(self):
        context = super(WelcomeNotification, self).create_context()
        context.update({
            'user': self.user,
            'subject': self.subject,
            'datetime': timezone.now() + datetime.timedelta(hours=12),
            'for_offer': self.for_offer
        })      
        return context


class PasswordResetNotification(NotificationBase):
    def __init__(self, user, template='./notifications/common/reset_password.html', verb=Notification.Verb.PASSWORD_RESET):
        self.user = user
        self.subject = "Reset your password"
        self.need_settings = False
        super(PasswordResetNotification, self).__init__(template, verb, user.user, level=Notification.LEVELS.SUCCESS)

    def create_context(self):
        context = super(PasswordResetNotification, self).create_context()
        context.update({'user': self.user, 'subject': self.subject})
        return context


class NewOfferNotification(NotificationBase):
    def __init__(self, user, item, offer, template='./notifications/seller/new_offer.html', verb=Notification.Verb.NEW_OFFER):
        self.user = user
        self.item = item
        self.offer = offer
        self.subject = "New Offer on your %s" %(item.name)
        self.need_settings = False
        super(NewOfferNotification, self).__init__(template, verb, user.user, level=Notification.LEVELS.SUCCESS)

    def create_context(self):
        context = super(NewOfferNotification, self).create_context()
        context.update({'user': self.user, 'subject': self.subject, 'item':self.item, 'offer':self.offer})
        return context


class OfferResolveNotification(NotificationBase):
    def __init__(self, user, item, offer, template='./notifications/seller/offer_resolve.html', verb=Notification.Verb.OFFER_RESOLVE):
        self.user = user
        self.item = item
        self.offer = offer
        if offer.accepted == True:
            self.subject = "The seller has accepted your offer on %s" %(item.name)
        else:
            self.subject = "The seller has declined your offer on %s" %(item.name)

        self.need_settings = False
        super(OfferResolveNotification, self).__init__(template, verb, user.user, level=Notification.LEVELS.SUCCESS)

    def create_context(self):
        context = super(OfferResolveNotification, self).create_context()
        context.update({'user': self.user, 'subject': self.subject, 'item':self.item, 'offer':self.offer})
        return context
