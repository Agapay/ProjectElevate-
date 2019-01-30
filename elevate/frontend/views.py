from django.shortcuts import render
from django.views.decorators.cache import never_cache

@never_cache
def index(request, id=0, bid=0, cid=0, sid=0):
    return render(request, 'frontend/index.html')
    #react will manage index as a Single-Page Application
