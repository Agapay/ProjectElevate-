from .views import UserRUDView
from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
#from django.conf import url

urlpatterns = [

    path('<int:id>', UserRUDView.as_view(), name="post-rud"),
    #url(r'^$', UserRUDView.as_view(), name="post-rud"),

]


