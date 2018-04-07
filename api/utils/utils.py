import re
from django.conf import  settings
from django.db import connection
from django.db import connections
import time, os.path
from django.core.files.uploadedfile import InMemoryUploadedFile
import urllib
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from django.utils.http import int_to_base36, base36_to_int
from django.utils.crypto import salted_hmac
import os.path
import datetime

def unslugify(value):
    return value.replace('-', ' ').title()

#potentially better unslugify function
def deslugify(value):
    """
    Cleans up a slug by removing slug separator characters that occur at the
    beginning or end of a slug.
    """
    reverse_map = {
      "_" : " ",
      "-" : " : ",
    }

    for _from, _to in reverse_map.iteritems():
        value = re.sub(_from, _to, value)
    return value

def make_token(user, email, timestamp=None):
    if not timestamp:
        delta = datetime.datetime.today() - datetime.datetime(2001, 1, 1)
        timestamp = int_to_base36(int(delta.days))
    value = (str(user.id) + str(user.email) + str(email) + str(timestamp))
    key_salt = "L0cAlLin3-email-verification-token-generator"
    hash = salted_hmac(key_salt, value).hexdigest()[::2]
    return "%s-%s" % (timestamp, hash)

def reset_password(sauser):
    sauser.password_reset_token = make_token(sauser, sauser.email, None)                
    sauser.save()

def boolean_switch(field):
    def _f(self):
        v = getattr(self,field.name)
        return '<a href ="%d/%s/switch/"><img src="%simg/icon-%s.gif" alt="%d"/></a>'%(self.id,field.name,
                                                                                              settings.ADMIN_MEDIA_PREFIX,('no','yes')[v],v)
    _f.short_description = field.verbose_name
    _f.allow_tags = True
    return _f


def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


from django.core.serializers.json import DjangoJSONEncoder
from django.core import serializers
from django.db.models.query import QuerySet


class HandleQuerySets(DjangoJSONEncoder):
    """ simplejson.JSONEncoder extension: handle querysets """
    def default(self, obj):
        if isinstance(obj, QuerySet):
            return serializers.serialize("python", obj, ensure_ascii=False)
        return DjangoJSONEncoder.default(self, obj)


class Enumeration(object):
    def __init__(self, *choices):
        self.choices = tuple(enumerate(choices, start=1))
        self.__dict__.update([(re.sub('[^A-Z0-9]', '_', choice.upper()), index)
                              for index, choice in self.choices])

    @property
    def values(self):
        return [choice[0] for choice in self.choices]





class ErrorMiddleware(object):
    """
    Alter HttpRequest objects on Error
    """

    def process_exception(self, request, exception):
        """
        Add user details.
        """
        if request.user.is_authenticated():
            request.META['USER'] = request.user.username


def customQuery(sql):
    cursor = connections['default'].cursor()    
    cursor.execute(sql,[])
    result_list = [] 
    for row in cursor.fetchall(): 
        result_list.append(row) 
    return result_list


def customQueryCustomConnection(sql, connection_name):
    cursor = connections[connection_name].cursor()    
    cursor.execute(sql,[])
    result_list = [] 
    for row in cursor.fetchall(): 
        result_list.append(row) 
    return result_list

def customQueryIds(sql):
    cursor = connections['default'].cursor()    
    cursor.execute(sql,[])
    result_list = [] 
    for row in cursor.fetchall(): 
        result_list.append(row[0]) 
    return result_list      


def array_to_dict(inputArray, fields):
    values = []
    for item in inputArray:
        value = {}
        i=0
        for field in fields:
            value[field] = item[i]
            i+=1
        values.append(value)
    return values    

def add_len_protocol_to_raw_sql_query( query ):
    """
    Adds/Overrides a dynamic implementation of the length protocol to the definition of RawQuerySet for the remainder of this thread's lifespan
    """
    from django.db.models.query import RawQuerySet
    def __len__( self ):
        from django.db import connection
        sql = 'SELECT COUNT(*) FROM (' + query + ') B;'
        cursor = connection.cursor()
        cursor.execute( sql )
        row = cursor.fetchone()
        return row[ 0 ]
    setattr( RawQuerySet, '__len__', __len__ )



