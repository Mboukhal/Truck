# Generated by Django 4.2.20 on 2025-03-18 08:13

import datetime
from django.db import migrations, models
import django.db.models.deletion
import eld_log.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='EldLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_of_carrier', models.CharField(max_length=100)),
                ('name_of_co_driver', models.CharField(blank=True, max_length=100, null=True)),
                ('main_soffice_address', models.CharField(blank=True, max_length=100, null=True)),
                ('date', models.DateField(blank=True, default=datetime.date.today)),
                ('Total_miles_driving_today', models.PositiveIntegerField(blank=True, null=True)),
                ('vehicle_number', models.PositiveIntegerField(blank=True, null=True)),
                ('trailer_number', models.PositiveIntegerField(blank=True, null=True)),
                ('driver_signature', models.ImageField(blank=True, upload_to=eld_log.models.file_location)),
                ('totle_off_duty', models.PositiveIntegerField(blank=True, null=True)),
                ('totle_driving', models.PositiveIntegerField(blank=True, null=True)),
                ('totle_on_duty', models.PositiveIntegerField(blank=True, null=True)),
                ('totle_sleeper_berth', models.PositiveIntegerField(blank=True, null=True)),
                ('shipping_document', models.CharField(blank=True, max_length=100, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Timing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('ON', 'On Duty'), ('OFF', 'Off Duty'), ('DR', 'Driving'), ('SB', 'Sleeper Berth')], max_length=3)),
                ('from_time', models.TimeField(null=True)),
                ('to_time', models.TimeField(null=True)),
                ('remarks', models.CharField(blank=True, max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('eld_log', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='timings', to='eld_log.eldlog')),
            ],
        ),
    ]
