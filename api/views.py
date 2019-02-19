from django.contrib.auth.models import User
#from myapp.serializers import UserSerializer
from rest_framework import generics
#from rest_framework.permissions import IsAdminUser
from core.models import User
from .serializers import UserSerializer


class UsersAPIView(generics.CreateAPIView):
    lookup_field = 'id'
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.all()


    def perform_create(self, serializer):
        instance = serializer.save()
        if instance.business:
            print("hello")
        instance.set_password(instance.password)
        instance.save()


class BusinessesAPIView(generics.ListAPIView):
    lookup_field        = 'id'
    serializer_class    = UserSerializer

    def get_queryset(self):
        return User.objects.filter(business=True)




class UserRUDView(generics.RetrieveUpdateDestroyAPIView): #detail view
    lookup_field            = 'id'
    serializer_class        = UserSerializer

    def get_queryset(self):
        return User.objects.all()








