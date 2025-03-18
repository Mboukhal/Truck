from django.shortcuts import render
from rest_framework import viewsets
from .models import EldLog, Timing
from .serializers import EldLogSerializer, TimingSerializer

# Create your views here.

class EldLogViewSet(viewsets.ModelViewSet):
    queryset = EldLog.objects.all()
    serializer_class = EldLogSerializer

class TimingViewSet(viewsets.ModelViewSet):
    queryset = Timing.objects.all()
    serializer_class = TimingSerializer