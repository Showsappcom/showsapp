import stripe
from models import Offer

def captureGFM(offer):
    stripe.api_key = settings.STRIPE['SECRET_KEY']
    charge = stripe.Charge.retrieve(offer.charge_charge_token)
    return charge.capture()