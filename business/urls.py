from django.urls import path
from .views import current_business, BusinessList

urlpatterns = [
    path('current_business/', current_business),
    path('businesses/', BusinessList.as_view())
]