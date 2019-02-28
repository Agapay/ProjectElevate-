from .views import UserRUDView, UsersAPIView, BusinessesAPIView, CustomersAPIView, CreateSubscriptionPlan, \
    CreateBenefit, ViewCustomer, ViewAllBenefits, ViewAllSubscriptions
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from django.conf.urls import url
from rest_framework import routers

router = routers.DefaultRouter(trailing_slash=False)

#router.register('businesses', BusinessesAPIView)
#router.register('customers', CustomersAPIView)

#urlpatterns = router.urls

urlpatterns = [
    path('<int:id>', UserRUDView.as_view(), name="post-rud"),
    path('',UsersAPIView.as_view(), name="post-create"),
    path('businesses', BusinessesAPIView.as_view(), name="retrieve"),
    path('businesses/<int:business_id>/customers', CustomersAPIView.as_view(), name="get-customers"),
    path('businesses/<int:business_id>/customer/<int:customer_id>', ViewCustomer.as_view(), name='get-customer'),
    path('create_subscription', CreateSubscriptionPlan.as_view(), name="sub-create"),
    path('create_benefit', CreateBenefit.as_view(), name="ben-create"),
    path('businesses/<int:business_id>/benefits', ViewAllBenefits.as_view(), name="ben-view"),
    path('businesses/<int:business_id>/subscriptions', ViewAllSubscriptions.as_view(), name="sub-view"),


    #url(r'^$', UserRUDView.as_view(), name="post-rud"),
    #url(r'businesses/(?P<b_id>[\d]+)/customers', CustomersAPIView.as_view(), name=getcustomers),

]



#url(r'^location-by-country/(?P<country_pk>[0-9]+)/$', views.LocationByCountryListAPIView.as_view(), name='location-by-country-detail')