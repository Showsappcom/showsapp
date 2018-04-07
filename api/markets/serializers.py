from rest_framework import serializers
from markets.models import *
from accounts.serializers import AccountSerializer, SAUserSerializer
from django.db.models import Q


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'slug', 'price', 'created_at')


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('id', 'sa_user', 'item', 'message', 'value', 'created_at')


class DetailedItemSerializer(serializers.ModelSerializer):
    offers = serializers.SerializerMethodField('_offers')

    def _offers(self, obj):
        return OfferSerializer(obj.offers.all(),many=True).data
    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'slug', 'price', 'offers', 'created_at')