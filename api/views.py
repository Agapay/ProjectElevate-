from django.contrib.auth.models import User
#from myapp.serializers import UserSerializer
from rest_framework import generics
#from rest_framework.permissions import IsAdminUser
from core.models import User
from core.models import Customer
from core.models import Business
from core.models import UserManager
from core.models import SubscriptionPlan
from core.models import Benefit
from rest_framework.response import Response
import json

from .serializers import UserSerializer, CustomerSerializer, \
    SubscriptionPlanSerializer, HistoryRedeemablesSerializer, \
    BenefitSerializer, BusinessSerializer




class UsersAPIView(generics.CreateAPIView):
    lookup_field = 'id'
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


    def perform_create(self, serializer):
        instance = serializer.save()
        if instance.business:
            info = dict()
            # create business
            info['id'] = instance.id
            info['email'] = instance.email
            info['username'] = instance.username
            info['business_name'] = instance.business_name
            info['user_api_key'] = instance.business_api_key
            info['nmi_login'] = ''
            info['expiration_date'] = instance.expiration_date
            info['phone_number'] = instance.phone_number

            info['first_name'] = instance.first_name
            info['last_name'] = instance.last_name

            info['street_branch_address']   = instance.street_branch_address
            info['apt_branch_address']      = instance.apt_branch_address
            info['city_branch_address']     = instance.city_branch_address
            info['state_branch_address']    = instance.state_branch_address
            info['country_branch_address']  = instance.country_branch_address
            info['zip_branch_address']      = instance.zip_branch_address

            info['street_hq_address']       = instance.street_hq_address
            info['apt_hq_address']          = instance.apt_hq_address
            info['city_hq_address']         = instance.city_hq_address
            info['state_hq_address']        = instance.state_hq_address
            info['country_hq_address']      = instance.country_hq_address
            info['zip_hq_address']          = instance.zip_hq_address


            u = UserManager()
            u.createBusiness(info)



        if instance.customer:
            #create customer
            info = dict()

            info['id'] = instance.id
            info['business'] = instance.business_FK # business_FK
            info['username'] = instance.username
            info['first_name'] = instance.first_name
            info['last_name'] = instance.last_name
            info['phone_number'] = instance.phone_number
            info['email'] = instance.email
            info['user_api_key'] = instance.business_api_key
            info['active'] = instance.active
            info['street_home_address'] = instance.street_home_address
            info['apt_home_address'] = instance.apt_home_address
            info['city_home_address'] = instance.city_home_address
            info['state_home_address'] = instance.state_home_address
            info['country_home_address'] = instance.country_home_address
            info['zip_home_address'] = instance.zip_home_address

            u = UserManager()
            u.createCustomer(info)




        instance.set_password(instance.password)
        instance.save()


class BusinessesAPIView(generics.ListAPIView):
    lookup_field        = 'id'
    serializer_class    = BusinessSerializer
    def get_queryset(self):
        return Business.objects.all()



#
# class UserRUDView(generics.RetrieveUpdateDestroyAPIView): #detail view
#     lookup_field            = 'id'
#     serializer_class        = UserSerializer
#
#     def get_queryset(self):
#         return User.objects.all()




class CustomersAPIView(generics.ListAPIView):

    lookup_field = 'id'
    serializer_class = CustomerSerializer

    def get(self, request, business_id):
        print(business_id)
        b = Business.objects.filter(pk=business_id)
        if len(b) > 0:
            b = b[0]
            customers = Customer.objects.filter(business=b)
            customer_serializer = CustomerSerializer(customers, many=True)
            res = Response({'customers':customer_serializer.data})
            return res
        else:
            print("no")
            return Response({})



class CreateSubscriptionPlan(generics.CreateAPIView):
    lookup_field = 'id'
    serializer_class = SubscriptionPlanSerializer


    def get_queryset(self):
        return SubscriptionPlan.objects.all()

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.save()
        print("Creating PLAN")


class CreateBenefit(generics.CreateAPIView):
    lookup_field = 'id'
    serializer_class = BenefitSerializer

    def get_queryset(self):
        return Benefit.objects.all()

    def perform_create(self, serializer):
        instance = serializer.save()
        instance.save()

        b_id = instance.business
        subscription_plans = SubscriptionPlan.objects.filter(business=b_id)
        for subscription in subscription_plans:
            subscription.benefits.add(instance)
        

class ViewCustomer(generics.ListAPIView):
    lookup_field = 'id'
    serializer_class = CustomerSerializer

    def get(self, request, business_id, customer_id):
        c = Customer.objects.filter(id=customer_id)
        if len(c) > 0:
            c = c[0]
            customers = Customer.objects.filter(id=customer_id)
            customer_serializer = CustomerSerializer(customers, many=True)
            res = Response({'customer':customer_serializer.data})
            return res

        else:
            return Response({})



class ViewAllBenefits(generics.ListAPIView):

    lookup_field = 'id'
    serializer_class = BenefitSerializer

    def get(self, request, business_id):
        print(business_id)
        b = Business.objects.filter(pk=business_id)
        print(b)
        if len(b) > 0:
            b = b[0]
            benefits = Benefit.objects.filter(business=b)
            benefits_serializer = BenefitSerializer(benefits, many=True)
            res = Response({'benefits':benefits_serializer.data})
            return res
        else:
            print("no")
            return Response({})



class ViewAllSubscriptions(generics.ListAPIView):

    lookup_field = 'id'
    serializer_class = SubscriptionPlanSerializer

    def get(self, request, business_id):
        print(business_id)
        b = Business.objects.filter(pk=business_id)
        if len(b) > 0:
            b = b[0]
            subscriptions = SubscriptionPlan.objects.filter(business=b)
            subscription_serializer = SubscriptionPlanSerializer(subscriptions, many=True)
            res = Response({'subscriptions':subscription_serializer.data})
            return res
        else:
            print("no")
            return Response({})







class ViewHistoryRedeemables(generics.ListAPIView):
    lookup_field = 'id'
    serializer_class = HistoryRedeemablesSerializer



class CustomerRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = CustomerSerializer

    def get_queryset(self):
        return Customer.objects.all()


class BenefitRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = BenefitSerializer


    def get_queryset(self):
        return Benefit.objects.all()


class SubscriptionPlanRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = SubscriptionPlanSerializer

    def get_queryset(self):
        return SubscriptionPlan.objects.all()




class BusinessRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = BusinessSerializer

    def get_queryset(self):
        return Business.objects.all()


class BenefitRUDView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = BenefitSerializer

    def get(self, request, ben_id):

        b = Benefit.objects.filter(pk=ben_id)
        print("HERE")
        if len(b) > 0:
             b = b[0]
             benefits_serializer = BenefitSerializer(b)
             print(benefits_serializer)
             print("here")
             res = Response({'benefit': benefits_serializer.data})
             return res
        else:
             print("no")
             return Response({})






