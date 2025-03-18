from rest_framework import serializers
from .models import EldLog, Timing

class TimingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timing
        fields = '__all__'

class EldLogSerializer(serializers.ModelSerializer):
    timings = TimingSerializer(many=True, required=False)
    
    class Meta:
        model = EldLog
        fields = '__all__'
    