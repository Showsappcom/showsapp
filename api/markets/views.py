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


class ImageView(generics.CreateAPIView):
    """
    A protected API to create an image for an item.
    """
    serializer_class = ImageSerializer
    parser_classes = (FormParser, MultiPartParser, )
    authentication_classes = (JSONWebTokenAuthentication, )

    """
    A protected API to create an image for an item.
    """
    def post(self, request, format='json'):
        serializer = CreateImageSerializer(data=request.data, context={ 'request': request})
        if serializer.is_valid():
            item = serializer.save()
            return Response(ImageSerializer(item).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """
        A protected API to delete an iamge by id.
        """
        if GalleryPhoto.objects.filter(id=id):
            image = GalleryPhoto.objects.get(pk=id)
            if image.item.sa_user != request.user.sa_user:
                return Response({}, 403)
            image.active = False
            image.save()
            serializer = self.get_serializer(image, context={'request': request})
            return Response(serializer.data)
        else:
            return Response({}, status=404)        


class CreateItem(generics.CreateAPIView):
    """
    A protected API to create an item as a seller.
    """
    serializer_class = CreateItemSerializer
    authentication_classes = (JSONWebTokenAuthentication, )

    def post(self, request, format='json'):
        serializer = CreateItemSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            item = serializer.save()
            return Response(ItemSerializer(item).data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PlaceOffer(generics.CreateAPIView):
    """
    An open API to create an offer on an item.
    """
    serializer_class = CreateOfferSerializer
    def post(self, request, format=None):
        serializer = CreateOfferSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            offer = serializer.save()
            return Response(OfferSerializer(offer).data)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AcceptDeclineOffer(generics.CreateAPIView):
    """
    A protected API to accept or decline an offer on an item.
    """
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    serializer_class = AcceptDeclineOfferSerializer
    def post(self, request, format=None):
        serializer = AcceptDeclineOfferSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            offer = serializer.save()
            return Response(OfferSerializer(offer).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


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
    A protected API to list the items for the seller
    """
    pagination_class = StandardResultsSetPagination
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    queryset = Item.objects.all()
    serializer_class = DetailedItemSerializer

    def get_queryset(self):
        user = self.request.user.sa_user
        items = user.items.filter(active=True).order_by('-id')

        return items

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)


        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

class MarketplaceList(generics.ListAPIView):
    """
    A protected API to list the marketplaces for a member
    """
    pagination_class = StandardResultsSetPagination
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    serializer_class = MarketplaceSerializer

    def get_queryset(self):
        user = self.request.user.sa_user

        marketplace_memberships = user.marketplacememberships.filter(active=True).values_list('marketplace_id', flat=True)
        marketplaces = Marketplace.objects.filter(id__in = marketplace_memberships, active=True)
        print(marketplace_memberships)
        # marketplaces = user.marketplaces.filter(active=True).order_by('-id')

        return marketplaces

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)


        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


class ItemBySlug(generics.ListAPIView):
    """
    An open API to get an item by seller id and item slug
    """
    serializer_class = ItemSerializer

    def get(self, request, seller_id, slug, *args, **kwargs):
        """
        An open API to get an item by seller id and item slug
        """

        items = Item.objects.filter(slug=slug, sa_user__id=seller_id)
        if items.exists():
            serializer = self.get_serializer(items[0], context={'request': request})
            return Response(serializer.data)
        else:
            return Response({}, status=404)


class MyOffers(generics.ListAPIView):
    """
    A protected API to list the offers for the buyer
    """
    pagination_class = StandardResultsSetPagination
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)

    queryset = Item.objects.all()
    serializer_class = DetailedOfferSerializer

    def get_queryset(self):
        user = self.request.user.sa_user
        offers = user.offers.all().order_by('id')

        return offers

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(queryset)


        if page is not None:
            serializer = self.get_serializer(page, many=True, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)


class MyItem(generics.ListAPIView):
    """
    A protected API to get or delete an item by id for the seller
    """
    pagination_class = StandardResultsSetPagination
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (IsAuthenticated,)
    serializer_class = DetailedItemSerializer

    def get(self, request, id, *args, **kwargs):
        """
        A protected API to get an item by id for the seller
        """
        if Item.objects.filter(id=id):
            item = Item.objects.get(pk=id)
            serializer = self.get_serializer(item, context={'request': request})
            return Response(serializer.data)
        else:
            return Response({}, status=404)

    def delete(self, request, id):
        """
        A protected API to delete an item by id for the seller
        """
        if Item.objects.filter(id=id):
            item = Item.objects.get(pk=id)
            if item.sa_user != request.user.sa_user:
                return Response({}, 403)
            item.active = False
            item.save()
            serializer = self.get_serializer(item, context={'request': request})
            return Response(serializer.data)
        else:
            return Response({}, status=404)


def item(request,seller_id, slug):
    items = Item.objects.filter(slug=slug, sa_user__id=seller_id)
    if items.exists():
        context = { "item": items[0] }
    else:
        context = { "item": None }

    template = get_template('./markets/item.html')
    return HttpResponse(template.render(context,request))