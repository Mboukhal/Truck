# Generated by Django 4.2.20 on 2025-03-18 07:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eld_log', '0005_alter_eldlog_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eldlog',
            name='date',
            field=models.DateField(blank=True, default=datetime.date.today),
        ),
    ]
