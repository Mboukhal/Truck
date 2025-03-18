from django.contrib import admin
from .models import EldLog, Timing
# Register your models here.

class EldLogAdmin(admin.ModelAdmin):
    list_display = ('name_of_carrier', 'name_of_co_driver', 'main_soffice_address', 'date', 'Total_miles_driving_today', 'vehicle_number', 'trailer_number', 'driver_signature', 'timings', 'totle_off_duty', 'totle_driving', 'totle_on_duty', 'totle_sleeper_berth', 'shipping_document', 'created_at')
    search_fields = ('name_of_carrier', 'name_of_co_driver', 'main_soffice_address', 'date', 'Total_miles_driving_today', 'vehicle_number', 'trailer_number', 'driver_signature', 'timings', 'totle_off_duty', 'totle_driving', 'totle_on_duty', 'totle_sleeper_berth', 'shipping_document', 'created_at')
    readonly_fields = ('created_at',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    

admin.site.register(EldLog)
admin.site.register(Timing)


