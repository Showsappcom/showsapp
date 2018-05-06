from django.conf.urls import include, url
from django.urls import path
from django.contrib import admin
from django.views.generic.base import TemplateView
from django.contrib.sitemaps.views import sitemap
from django.views.generic import RedirectView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from markets.views import *

urlpatterns = [
    path('create_item/', CreateItem.as_view(), name="create_item"),
    path('myitems/', MyItems.as_view(), name="myitems"),
    path('item/<int:seller_id>/<slug>/', ItemBySlug.as_view(), name='myitems'),
    path('myoffers/', MyOffers.as_view(), name="myoffers"),
    path('myitems/<int:id>', MyItem.as_view(), name='myitems'),
    path('place_offer/', PlaceOffer.as_view(), name="place_offer"),
    path('accept_offer/', AcceptDeclineOffer.as_view(), name="accept_offer"),
    path('join_waiting_list/', JoinWaitingList.as_view(), name="join_waiting_list"),
    path('pay_gfm/', PayGFM.as_view(), name="pay_gfm"),
]
