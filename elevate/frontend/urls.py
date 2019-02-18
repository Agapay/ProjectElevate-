from django.urls import path
from . import views
urlpatterns = [
    path('', views.index),
    path('test', views.index),
    path('example', views.index),
    path('login', views.index),

    # Admin Routes
    path('admin/<int:id>', views.index),
    path('admin/<int:id>/dashboard', views.index),
    path('admin/<int:id>/add-business', views.index),
    path('admin/<int:id>/business/<int:bid>/NMIsetup-1', views.index),
    path('admin/<int:id>/business/<int:bid>/NMIsetup-2', views.index),
    path('admin/<int:id>/business/<int:bid>', views.index),
    
    # Business Routes
    path('business/<int:id>/dashboard', views.index),
    path('business/<int:id>/subscriptions', views.index),
    path('business/<int:id>/benefits', views.index),
    path('business/<int:id>/add-customer', views.index),
    path('business/<int:id>/add-subscription', views.index),
    path('business/<int:id>/add-benefit', views.index),
    path('business/<int:id>/customer/<int:cid>', views.index),
    path('business/<int:id>/subscription/<int:sid>', views.index),
    path('business/<int:id>/benefit/<int:beid>', views.index),
    path('business/<int:id>/customer/<int:cid>/NMIsetup-1', views.index),
    path('business/<int:id>/customer/<int:cid>/NMIsetup-2', views.index),

    # Customer Routes
    path('customer/<int:id>/dashboard', views.index),
]