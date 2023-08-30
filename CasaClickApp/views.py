from django.shortcuts import render


def landing(request):
    return render(request,'base.html')

def map_view(request):
    return render(request, 'map.html')


