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
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    elif request.method == 'POST':
        serializer = EldLogSerializer(data=request.data)
        if serializer.is_valid():
            
            # print('POST: ', serializer.validated_data["name_of_carrier"])
            # print('POST: ', JSON.stringify(serializer.data))
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        # print('PATCH: ', id)
        # print('PATCH: ', request.data.keys())
        
        eldlog = EldLog.objects.get(id=id)
        serializer = EldLogSerializer(eldlog, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # elif request.method == 'DELETE':
    #     eldlogs = EldLog.objects.get(id=id)
    #     eldlogs.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


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


# class TimingViewSet(viewsets.ModelViewSet):
#     queryset = Timing.objects.all()
#     serializer_class = TimingSerializer

@api_view(['GET', 'POST', 'PATCH', 'DELETE'])
def timing(request, id=None):
    
    if request.method == "GET":
        
        if id:
            # print('ID: ', id)
            
            timmingImstence = Timing.objects.filter(eld_log_id=id).order_by('to_time').values()
            # print('TIMING: ', timmingImstence)
            serializer = TimingSerializer(timmingImstence, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            timmingImstence = Timing.objects.all().order_by('-created_at').values()
            serializer = TimingSerializer(timmingImstence, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
            
            
        # return Response(status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'POST':
        # print('POST: ', request.data)
        serializer = TimingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print('POST: ', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        timing = Timing.objects.get(id=id)
        timing.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)