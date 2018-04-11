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
from django.http import HttpResponse
from django.template import Template, Context
from django.template.loader import get_template

class CreateItem(generics.CreateAPIView):
    """
    A prodtected API to create an item as a seller.
    """
    serializer_class = CreateItemSerializer

    def post(self, request, format='json'):
        serializer = CreateItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            item = serializer.save()
            return Response(ItemSerializer(item).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

class PlaceOffer(generics.CreateAPIView):
    """
    A protected API to create an offer on an item.
    """
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    serializer_class = CreateOfferSerializer
    def post(self, request, format=None):
        serializer = CreateOfferSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            offer = serializer.save()
            return Response(OfferSerializer(offer).data)
        return 


class JoinWaitingList(generics.CreateAPIView):
    """
    A protected API to join the waiting list on an item.
    """
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    serializer_class = CreateWaitingListSubscriptionSerializer
    def post(self, request, format=None):
        serializer = CreateWaitingListSubscriptionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            subscription = serializer.save()
            return Response(WaitingListSubscriptionSerializer(subscription).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PayGFM(generics.CreateAPIView):
    """
    A protected API to pay a GFM for an on-hold offer and release it.
    """
    # authentication_classes = (JSONWebTokenAuthentication, )
    # permission_classes = (IsAuthenticated,)
    serializer_class = PayGFMSerializer
    def post(self, request, format=None):
        serializer = PayGFMSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            offer = serializer.save()
            return Response(OfferSerializer(offer).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)      

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
        items = user.items.all().order_by('active','id')

        return items

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)


        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


def item(request,id):
    item = Item.objects.get(pk=id)
    context = { "item": item, "stripe_pk": settings.STRIPE['PUBLISHABLE_KEY'], "value": item.good_faith_money * 100 }
    template = get_template('./markets/item.html')
    return HttpResponse(template.render(context,request))