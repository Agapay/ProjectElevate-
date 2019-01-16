from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Business
from .serializer import BusinessSerializer, BusinessSerializerWithToken

# Create your views here.


@api_view(['GET'])
def current_business(request):
    """
    Determine the current user by their token, and return their data
    """

    serializer = BusinessSerializer(request.business)
    print(serializer)
    return Response(serializer.data)


class BusinessList(APIView):
    """
    Create a new Business. It's called 'BusinessList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = BusinessSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

