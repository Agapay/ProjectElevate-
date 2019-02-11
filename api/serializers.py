from rest_framework import serializers
from core.models import User, Business, Customer, Subscription

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
                'id',
                "email",
                "password",
                "username",
                "active",
                "admin",
                "staff",
                "customer",
                "business",
                "business_name",
                "name",
                "last_name",
                "phone_number",
                "business_api_key",
                "expiration_date",
                "street_branch_address",
                "apt_branch_address",
                "city_branch_address",
                "state_branch_address",
                "country_branch_address",
                "zip_branch_address",
                "street_hq_address",
                "apt_hq_address",
                "city_hq_address",
                "state_hq_address",
                "country_hq_address",
                "zip_hq_address",
                "street_home_address",
                "apt_home_address",
                "city_home_address",
                "state_home_address",
                "country_home_address",
                "zip_home_address",
        ]

        # converts to json
        # validations for data passed


        read_only_fields = ['id']



class BusinessSerializer(serializers.ModelSerializer):
        class Meta:
                model = Business
                fields = []


class CustomerSerializer(serializers.ModelSerializer):
        class Meta:
                model = Customer
                fields = []



class SubscriptionSerializer(serializers.ModelSerializer):
        class Meta:
                model = Subscription
                fields = []