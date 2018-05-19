from django.db import models
from accounts.models import Account, SAUser
from django.utils import timezone
from django.utils.text import slugify
# Create your models here.

class Item(models.Model):
    sa_user = models.ForeignKey(SAUser, related_name='items', null=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=360, blank=True, null=True)
    description = models.TextField(blank=True, null=True, default="")
    slug = models.SlugField(max_length=255, blank=True, null=True, db_index = True)
    price = models.FloatField(blank=False, null=False, default=0.0)
    requires_good_faith_money = models.BooleanField(default=False)
    good_faith_money = models.FloatField(blank=False, null=False, default=0.0)
    active = models.BooleanField(default=True, blank=True)
    latitude = models.FloatField(blank=False, null=True, default=0.0)
    longitude = models.FloatField(blank=False, null=True, default=0.0)
    address = models.CharField(max_length=360, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'markets'

    def __str__(self):
        return "%s - %s" %(self.id, self.name) 
        
    def setSlug(self):
        name = self.name
        slug = slugify(name)

        if slug == self.slug:
            self.slug = slug
        else:
            num = 0
            temp = slug
            while Item.objects.filter(sa_user=self.sa_user, slug=temp).exclude(id=self.id).count() > 0:
                num += 1
                temp = slug + "-" + str(num)

            if num > 0:
                slug = slug + "-" + str(num)
            self.slug = slug

    def save(self, *args, **kwargs):
        if self.slug == None or self.slug == '':
            self.setSlug()
        super(Item, self).save(*args, **kwargs)


class Offer(models.Model):
    sa_user = models.ForeignKey(SAUser, related_name='offers', null=True, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name='offers', on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True, default="")
    value = models.FloatField(blank=True, null=True, default=0.0)
    on_hold = models.BooleanField(default=False, blank=True)
    accepted = models.BooleanField(default=False, blank=True)
    good_faith_money_paid = models.FloatField(blank=False, null=False, default=0.0)
    charge_token = models.CharField(max_length=360, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        app_label = 'markets'


class WaitingListSubscription(models.Model):
    sa_user = models.ForeignKey(SAUser, related_name='waiting_list_subscription', null=True, on_delete=models.CASCADE)
    item = models.ForeignKey(Item, related_name='waiting_list_subscription', on_delete=models.CASCADE)
    active = models.BooleanField(default=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        app_label = 'markets'

def itemgallery_generate_filename(self, filename):
    url = "%s/%s/small/%s" % ('gallery', self.user.id, filename)
    return url 

class GalleryPhoto(models.Model):
    item = models.ForeignKey(Item, related_name='gallery', null=True, blank=True, on_delete=models.CASCADE)
    description = models.TextField(blank=True, null=True)
    link = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    photo_file_name = models.FileField(upload_to=itemgallery_generate_filename, blank=True, null=True)

    class Meta:
        app_label = 'users'   

    @property
    def gallery_photo_small_url(self):
        if self.photo_file_name and self.photo_file_name != '':
            result = '%s%s' %(settings.IMAGES_URL, self.photo_file_name)
        else:
            result =  '%sdefault/%s' % (settings.IMAGES_URL, settings.DEFAULT_PROFILE_PHOTO)
        return result        

