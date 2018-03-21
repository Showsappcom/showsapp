from django.template import Library
from django import template
from django.conf import settings



register = template.Library()

ALLOWABLE_VALUES = ("CALL_US_AT", "EMAIL_HEADER_COLOR_1", "EMAIL_HEADER_COLOR_2", "EMAIL_US_AT", "DOMAIN", "FACEBOOK_APP_ID", "FRONTEND_DOMAIN", "DOMAIN_ONLY" )

# settings value
@register.simple_tag
def settings_value(name):
    is_allowable = [x for x in ALLOWABLE_VALUES if x == name]
    if len(is_allowable) > 0:
        return getattr(settings, name, '')
    return ''