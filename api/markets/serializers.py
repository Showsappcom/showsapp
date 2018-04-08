from rest_framework import serializers
from markets.models import *
from accounts.serializers import AccountSerializer, SAUserSerializer
from django.db.models import Q


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'slug', 'price', 'good_faith_money', 'requires_good_faith_money', 'created_at')

class CreateItemSerializer(serializers.Serializer):
    name = serializers.CharField(allow_null=False, allow_blank=False, write_only=True, required=True)
    description = serializers.CharField(allow_null=True, allow_blank=True, write_only=True)
    price = serializers.FloatField(allow_null=False, write_only=True, required=True)
    good_faith_money = serializers.FloatField(allow_null=False, write_only=True, required=True)
    requires_good_faith_money = serializers.NullBooleanField(write_only=True, required=False)

    def create(self, validated_data):
        sa_user = self.context['request'].user.sa_user
        name = validated_data.get('name')
        description = validated_data.get('description')
        price = validated_data.get('price')
        good_faith_money = validated_data.get('good_faith_money')
        requires_good_faith_money = validated_data.get('requires_good_faith_money') or False

        item = Item.objects.create(
            name=name, 
            description=description,
            price=price,
            good_faith_money=good_faith_money,
            sa_user=sa_user,
            requires_good_faith_money=requires_good_faith_money
        )

        return item


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('id', 'sa_user', 'item', 'message', 'value', 'good_faith_money_paid', 'on_hold', 'created_at')


class CreateOfferSerializer(serializers.Serializer):
    item = serializers.IntegerField(allow_null=False, write_only=True, required=True)
    message = serializers.CharField(allow_null=True, allow_blank=True, write_only=True)
    value = serializers.FloatField(allow_null=False, write_only=True, required=True)

    def create(self, validated_data):
        sa_user = self.context['request'].user.sa_user
        item_id = validated_data.get('item')
        message = validated_data.get('message')
        value = validated_data.get('value')
      
        item = Item.objects.get(pk=item_id)
        
        on_hold = item.requires_good_faith_money

        offer = Offer.objects.create(
            item=item,
            message=message,
            value=value,
            on_hold=on_hold,
            sa_user=sa_user
        )

        return offer

class DetailedItemSerializer(serializers.ModelSerializer):
    offers = serializers.SerializerMethodField('_offers')

    def _offers(self, obj):
        return OfferSerializer(obj.offers.filter(on_hold=False),many=True).data
    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'slug', 'price',
            'good_faith_money', 'requires_good_faith_money', 'offers', 'created_at')