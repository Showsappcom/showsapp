from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic.base import TemplateView
from django.contrib.sitemaps.views import sitemap
from django.views.generic import RedirectView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from rest_framework_jwt.views import obtain_jwt_token
from rest_framework_jwt.views import refresh_jwt_token
from accounts.views import *

urlpatterns = [
    url(r'^login/', obtain_jwt_token),
    url(r'^token-refresh/', refresh_jwt_token),
    url(r'^signup/', Signup.as_view(), name="signup"),
    url(r'^password_reset/', PasswordResetView.as_view(), name="password_reset"),
    url(r'^set_new_password/', SetNewPassword.as_view(), name="set_new_password")
]
