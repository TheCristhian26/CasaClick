from django.urls import path
from . import views

urlpatterns = [
    path('',views.landing,name="landing"),
    path('map/', views.map_view, name='map-view'),
    path('vend/',views.vend_view,name='vend_view'),
    
]
