
from django.contrib import admin
from django.urls import path,include
from CasaClickApp import urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('CasaClickApp.urls')),
]
