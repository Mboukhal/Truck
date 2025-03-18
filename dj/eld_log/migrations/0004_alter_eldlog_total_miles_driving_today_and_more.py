# Generated by Django 4.2.20 on 2025-03-18 07:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('eld_log', '0003_alter_eldlog_total_miles_driving_today_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eldlog',
            name='Total_miles_driving_today',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='main_soffice_address',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='name_of_co_driver',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='shipping_document',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='timings',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='eld_log.timing'),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='totle_driving',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='totle_off_duty',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='totle_on_duty',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='totle_sleeper_berth',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='trailer_number',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='eldlog',
            name='vehicle_number',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]
