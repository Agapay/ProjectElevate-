from django.contrib.auth.models import User
#from myapp.serializers import UserSerializer
from rest_framework import generics
#from rest_framework.permissions import IsAdminUser
from core.models import User
from .serializers import UserSerializer


class UserRUDView(generics.RetrieveUpdateDestroyAPIView): #detail view
    lookup_field            = 'id'
    serializer_class        =  UserSerializer


    def get_queryset(self):
        return User.objects.all()











