from django.shortcuts import render
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.db.models import Avg, Q, Sum
from django.utils import timezone
from rest_framework import generics, status, views
from rest_framework.authentication import (BasicAuthentication,
                                           SessionAuthentication)
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.settings import api_settings
from markets.serializers import *
from utils.models import StandardResultsSetPagination

class PlaceOffer(views.APIView):
    """

    """

    def post(self, request, format=None):
        data = request.data
        return Response({})

class MyItems(generics.ListAPIView):
    """

    """
    pagination_class = StandardResultsSetPagination
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    queryset = Item.objects.all()
    serializer_class = DetailedItemSerializer

    def get_queryset(self):
        user = self.request.user.sa_user
        items= user.items.all().order_by('active','id')

        return items

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)


        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)
