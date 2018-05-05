from rest_framework import serializers, exceptions
from markets.models import WaitingListSubscription, Item, Offer
from accounts.serializers import AccountSerializer, SAUserSerializer, SignupSerializer
from django.db.models import Q
import stripe
from notifications.mailers import NewOfferNotification
from django.contrib.auth.models import User

class ItemSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField('_url')
    def _url(self, obj):
        return '%s/%s' %(obj.sa_user.id, obj.slug)
    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'slug', 'price', 'good_faith_money',
        'requires_good_faith_money', 'latitude','longitude','url','address', 'created_at')

class CreateItemSerializer(serializers.Serializer):
    name = serializers.CharField(allow_null=False, allow_blank=False, write_only=True, required=True)
    description = serializers.CharField(allow_null=True, allow_blank=True, write_only=True)
    price = serializers.FloatField(allow_null=False, write_only=True, required=True)
    good_faith_money = serializers.FloatField(allow_null=False, write_only=True, required=True)
    requires_good_faith_money = serializers.NullBooleanField(write_only=True, required=False)
    latitude = serializers.FloatField(allow_null=False, write_only=True, required=False)
    longitude = serializers.FloatField(allow_null=False, write_only=True, required=False)
    address = serializers.CharField(allow_null=False, allow_blank=False, write_only=True, required=True)

    def create(self, validated_data):
        sa_user = self.context['request'].user.sa_user
        name = validated_data.get('name')
        description = validated_data.get('description')
        price = validated_data.get('price')
        good_faith_money = validated_data.get('good_faith_money')
        requires_good_faith_money = validated_data.get('requires_good_faith_money') or False
        latitude = validated_data.get('latitude')
        longitude = validated_data.get('longitude')
        address = validated_data.get('address')

        item = Item.objects.create(
            name=name, 
            description=description,
            price=price,
            good_faith_money=good_faith_money,
            sa_user=sa_user,
            requires_good_faith_money=requires_good_faith_money,
            latitude=latitude,
            longitude=longitude,
            address=address
        )

        return item


class OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = ('id', 'sa_user', 'item', 'message', 'accepted', 'value', 'good_faith_money_paid', 'on_hold', 'created_at')


class DetailedOfferSerializer(serializers.ModelSerializer):
    item = ItemSerializer()
    class Meta:
        model = Offer
        fields = ('id', 'sa_user', 'item', 'message', 'value', 'good_faith_money_paid', 'on_hold', 'created_at')



class CreateOfferSerializer(serializers.Serializer):
    item = serializers.IntegerField(allow_null=False, write_only=True, required=True)
    message = serializers.CharField(allow_null=True, allow_blank=True, write_only=True)
    email = serializers.CharField(allow_null=False, allow_blank=False, required=True)
    value = serializers.FloatField(allow_null=False, write_only=True, required=True)

    def create(self, validated_data):
        user = self.context['request'].user
        email = validated_data.get('email')
        item_id = validated_data.get('item')
        message = validated_data.get('message')
        value = validated_data.get('value')
        item = Item.objects.get(pk=item_id)
        on_hold = True

        if user.is_anonymous:
            signup = SignupSerializer(data={
                'email': email,
                'password': 'ldjlfajsd;lfajdslkfajdslkfj',
                'first_name': '',
                'last_name': '',
                'name': ''
            })
            print(signup.is_valid())
            if signup.is_valid():
                sa_user = signup.save()
            elif signup.errors.get('email') != None:
                sa_user = User.objects.filter(username__iexact=email)[0].sa_user
                if not sa_user.activated:
                    raise exceptions.APIException('Should verify the accout first.')

        else:
            on_hold = False
            sa_user = user.sa_user

        offer = Offer.objects.create(
            item=item,
            message=message,
            value=value,
            on_hold=on_hold,
            sa_user=sa_user
        )

        if not on_hold:
            NewOfferNotification(item.sa_user, item, offer).send()
        return offer

class AcceptDeclineOfferSerializer(serializers.Serializer):
    offer = serializers.IntegerField(allow_null=False, write_only=True, required=True)
    accept = serializers.NullBooleanField(write_only=True, required=True)

    def create(self, validated_data):
        sa_user = self.context['request'].user.sa_user
        offer_id = validated_data.get('offer')
        accept = validated_data.get('accept')

        try:
            offer = Offer.objects.get(pk=offer_id)
        except:
            raise exceptions.ValidationError('Could not find an offer with the given id')

        if offer.item.sa_user != sa_user:
            raise exceptions.ValidationError('Unauthorized to perform this action.')

        offer.accepted = accept

        offer.save()

        return offer

class WaitingListSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaitingListSubscription
        fields = ('id', 'sa_user', 'item', 'active', 'created_at')


class CreateWaitingListSubscriptionSerializer(serializers.Serializer):

    item = serializers.IntegerField(allow_null=False, write_only=True, required=True)
    active = serializers.NullBooleanField(write_only=True, required=False)

    def create(self, validated_data):
        sa_user = self.context['request'].user.sa_user
        item_id = validated_data.get('item')
        active = validated_data.get('requires_good_faith_money') or True

        item = Item.objects.get(pk=item_id)

        subscriptions = WaitingListSubscription.objects.filter(item_id=item,sa_user=sa_user).order_by('-id')
        if subscriptions.exists():
            subscription = subscriptions[0]
        else:    
            subscription = WaitingListSubscription.objects.create(
                item=item,
                sa_user=sa_user,
                active=active
            )

        return subscription

class PayGFMSerializer(serializers.Serializer):
    offer = serializers.IntegerField(allow_null=False, write_only=True, required=True)
    token = serializers.CharField(write_only=True, required=True)

    def create(self, validated_data):

        print(self.context['request'])
        offer_id = validated_data.get('offer')
        offer = Offer.objects.get(pk=offer_id)
        item = offer.item

        stripe.api_key = settings.STRIPE['SECRET_KEY']

        charge = stripe.Charge.create(
            amount=offer.value * 100,
            currency='cad',
            description=str(offer),
            source=token,
            capture=False
        )

        offer.on_hold = False

        offer.save()

        return offer

class DetailedItemSerializer(serializers.ModelSerializer):
    offers = serializers.SerializerMethodField('_offers')
    waiting_list = serializers.SerializerMethodField('_waiting_list')
    url = serializers.SerializerMethodField('_url')
    def _url(self, obj):
        return '%s/%s' %(obj.sa_user.id, obj.slug)

    def _offers(self, obj):
        return OfferSerializer(obj.offers.filter(on_hold=False), many=True).data

    def _waiting_list(self, obj):
        return WaitingListSubscriptionSerializer(obj.waiting_list_subscription.filter(active=True), many=True).data

    class Meta:
        model = Item
        fields = ('id', 'name', 'description', 'slug', 'price',
                  'good_faith_money', 'requires_good_faith_money',
                  'url', 'offers', 'waiting_list', 'created_at')
