from django.shortcuts import render
from rest_framework import viewsets
from .models import EldLog, Timing
from .serializers import EldLogSerializer, TimingSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response


# Create your views here.

@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def eldlog(request, id=None):
    
    if request.method == 'GET':
        # print('GET: ', id)
        
        eldlogs = None
        if id:
            eldlogs = EldLog.objects.get(id=id)
        else:
            eldlogs = EldLog.objects.all().order_by('-created_at').values()
        # eldlogs = EldLog.objects.all().order_by('-created_at').values()
        serializer = EldLogSerializer(eldlogs, many=False if id else True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = EldLogSerializer(data=request.data)
        if serializer.is_valid():
            
            # print('POST: ', serializer.validated_data["name_of_carrier"])
            # print('POST: ', JSON.stringify(serializer.data))
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class EldLogViewSet(viewsets.ModelViewSet):
#     queryset = EldLog.objects.all()
#     serializer_class = EldLogSerializer
    
#     @api_view(['GET', 'POST', 'PATCH', 'DELETE'])
#     def eldlog_list(request):
        
#         logger.info('Request:')
#         if request.method == 'GET':
#             eldlogs = EldLog.objects.all()
#             serializer = EldLogSerializer(eldlogs, many=True)
#             return Response(serializer.data)
        
#         elif request.method == 'POST':
#             serializer = EldLogSerializer(data=request.data)
#             if serializer.is_valid():
#                 pp.pprint(serializer.data)
#                 serializer.save()
#                 return Response(serializer.data, status=status.HTTP_201_CREATED)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TimingViewSet(viewsets.ModelViewSet):
    queryset = Timing.objects.all()
    serializer_class = TimingSerializer