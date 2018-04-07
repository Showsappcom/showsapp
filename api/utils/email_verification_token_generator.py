from django.utils.crypto import salted_hmac
from django.utils.http import int_to_base36, base36_to_int
import datetime
from django.utils import timezone
from django.conf import settings

def check_token(user, email, token):
    try:
        ts_b36, hash = token.split("-")
    except ValueError:
        return False

    try:
        ts = base36_to_int(ts_b36)
    except ValueError:
        return False

        # Check that the timestamp/uid has not been tampered with
    if not token == make_token(user, email, ts_b36):
        return False
    delta = datetime.datetime.today() - datetime.datetime(2001, 1, 1)
        # Check the timestamp is within limit
    if (delta.days - ts) > settings.PASSWORD_RESET_TIMEOUT_DAYS:
        return False

    return True

def make_token(user, email, timestamp=None):
    if not timestamp:
        delta = datetime.datetime.today() - datetime.datetime(2001, 1, 1)
        timestamp = int_to_base36(int(delta.days))
    value = (str(user.id) + str(user.email) + str(email) + str(timestamp))
    key_salt = "L0cAlLin3-email-verification-token-generator"
    hash = salted_hmac(key_salt, value).hexdigest()[::2]
    return "%s-%s" % (timestamp, hash)