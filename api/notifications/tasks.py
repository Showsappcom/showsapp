from celery import shared_task
from notifications.mailers import *
from accounts.models import *
from notifications.utils import *


@shared_task
def WelcomeNotification_Async(user_id):
    account = Account.objects.get(pk = user_id)
    users = account.onf_users.all()
    for onf_user in users:
        WelcomeNotification(user = onf_user).send()
    return "Sent!"


