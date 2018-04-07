import base64
import logging
import smtplib
import sys
import traceback

from django.conf import settings
from django.core.mail import get_connection
from django.core.mail.backends import base
from django.core.mail.message import EmailMessage, EmailMultiAlternatives

from utils import amazon_ses
from utils.models import FailedEmails

# get the logger
logger = logging.getLogger(__name__)


class AmazonSESBackend(base.BaseEmailBackend):
    amazon = amazon_ses.AmazonSES(settings.SES_ACCESS_KEY_ID, settings.SES_SECRET_ACCESS_KEY , settings.SES_DATA_CENTER)
  
    def send_messages(self, messages):
        """
        Sends one or more EmailMessage objects and returns the number of email
        messages sent.
        """
        num_sent = 0
        for message in messages:
            try:
                # send the message via Amazon SES

                msg = message.message()
            
                self.amazon._performAction(
                    'SendRawEmail',
                    {'RawMessage.Data':
                     base64.b64encode(msg.as_string().encode())})
            except Exception as e:
                # log the exception
                logger.error('Failed to send email %s' % (e.message))

                # extract exception information
                exc_type, exc_value, _ = sys.exc_info()
                e = traceback.format_exception_only(exc_type, exc_value)[0]
                stack = '\n'.join(traceback.format_exc().splitlines()[:-1])

                # create the failed email object
                FailedEmails(sender=message.from_email,
                             recipient='\n'.join(message.to),
                             content=message.body,
                             excepion_type_and_value=e,
                             exception_traceback=stack).save()

                #if not self.fail_silently:
                #    raise
            else:
                num_sent += 1

        # return number of messages sent
        return num_sent


class SAEmailMessage(EmailMessage):
    def send(self, fail_silently=False):
        """Sends the email message."""
        if not self.recipients():
            # Don't bother creating the network connection if there's nobody to
            # send to.
            return 0
        try:
            to_return = self.get_connection(fail_silently).send_messages([self])
            return to_return
        except smtplib.SMTPException:
            exc_type, exc_value, exc_traceback = sys.exc_info()
            excepion_type_and_value = traceback.format_exception_only(exc_type, exc_value)[0]
            formatted_lines = traceback.format_exc().splitlines()
            traceback_stack = '\n'.join(formatted_lines[:-1])

            #Creating a failed email object
            recipients = '\n'.join(self.to)
            f = FailedEmails(sender=self.from_email, recipient=recipients, content=self.body, excepion_type_and_value=excepion_type_and_value, exception_traceback=traceback_stack)
            f.save()


class SAEmailMultiAlternatives(EmailMultiAlternatives):
    def send(self, fail_silently=False):
        """Sends the email message."""
        if not self.recipients():
            # Don't bother creating the network connection if there's nobody to
            # send to.
            return 0
        try:
            to_return = self.get_connection(fail_silently).send_messages([self])
            return to_return
        except smtplib.SMTPException:
            exc_type, exc_value, exc_traceback = sys.exc_info()
            excepion_type_and_value = traceback.format_exception_only(exc_type, exc_value)[0]
            formatted_lines = traceback.format_exc().splitlines()
            traceback_stack = '\n'.join(formatted_lines[:-1])

            #Creating a failed email object
            recipients = '\n'.join(self.to)
            f = FailedEmails(sender=self.from_email, recipient=recipients, content=self.body, excepion_type_and_value=excepion_type_and_value, exception_traceback=traceback_stack)
            f.save()


def sasend_mail(subject, content, from_email, recipient_list, subtype=None,
                fail_silently=False, auth_user=None, auth_password=None,
                connection=None):

    connection = connection or get_connection(username=auth_user,
                                              password=auth_password,
                                              fail_silently=fail_silently)

    # create the message
    message = SAEmailMessage(subject, content, from_email, recipient_list,
                             connection=connection)

    # set content subtype
    if subtype:
        message.content_subtype = subtype

    # send the message
    return message.send()