from .views import UserRUDView, UsersAPIView, BusinessesAPIView
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
#from django.conf import url

urlpatterns = [

    path('<int:id>', UserRUDView.as_view(), name="post-rud"),
    path('',UsersAPIView.as_view(), name="post-create"),
    path('businesses', BusinessesAPIView.as_view(), name="retrieve")
    #url(r'^$', UserRUDView.as_view(), name="post-rud"),

]


