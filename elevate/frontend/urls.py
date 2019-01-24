from django.urls import path
from . import views
urlpatterns = [    
    path('', views.index),
    path('test', views.index),
    path('example', views.index),
    path('admin-login', views.index),
    path('admin/<int:id>', views.index),
    path('admin/<int:id>/dashboard', views.index),
    path('admin/<int:id>/add-business', views.index),
    path('admin/<int:id>/NMIsetup-1', views.index),
    path('admin/<int:id>/NMIsetup-2', views.index),
    path('admin/<int:id>/business/<int:bid>', views.index)
]