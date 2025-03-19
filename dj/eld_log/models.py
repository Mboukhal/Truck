from datetime import date
from django.db import models


def file_location(instance, filename, **kwargs):
    file_path = f"article/{instance.title}-{filename}"
    return file_path

class Timing(models.Model):
    TYPE_CHOICES = [
      ('ON', 'On Duty'),
      ('OFF', 'Off Duty'),
      ('DR', 'Driving'),
      ('SB', 'Sleeper Berth'),
    ]
    type = models.CharField(max_length=3, choices=TYPE_CHOICES)
    from_time = models.TimeField(null=True)
    to_time = models.TimeField(null=True)
    remarks = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    eld_log = models.ForeignKey('EldLog', on_delete=models.CASCADE, related_name='timings', null=True, blank=True)

    def __str__(self):
        return f"{self.get_type_display()}: {self.from_time} -> {self.to_time}{' - ' + self.remarks if self.remarks else ''}"

# Create your models here.
class EldLog(models.Model):
    name_of_carrier = models.CharField(max_length=100)
    name_of_co_driver = models.CharField(max_length=100, null=True, blank=True)
    main_office_address = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField(default=date.today, blank=True)
    total_miles_driving_today = models.PositiveIntegerField(null=True, blank=True)
    vehicle_number = models.PositiveIntegerField(null=True, blank=True)
    trailer_number = models.PositiveIntegerField(null=True, blank=True)
  
    driver_signature = models.ImageField(upload_to=file_location, null=False, blank=True)
    time_line = models.ImageField(upload_to=file_location, null=False, blank=True)
  
    # timings = models.ManyToManyField(Timing, blank=True, related_name='eld_logs')
    
    total_off_duty = models.PositiveIntegerField(null=True, blank=True)
    total_driving = models.PositiveIntegerField(null=True, blank=True)
    total_on_duty = models.PositiveIntegerField(null=True, blank=True)
    total_sleeper_berth = models.PositiveIntegerField(null=True, blank=True)
    
    shipping_document = models.CharField(max_length=100, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name_of_carrier
      
