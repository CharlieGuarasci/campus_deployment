# Generated by Django 5.1.6 on 2025-03-07 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        (
            "appuser",
            "0006_appuser_bio_appuser_location_appuser_profile_picture_and_more",
        ),
    ]

    operations = [
        migrations.AlterField(
            model_name="appuser",
            name="bio",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="appuser",
            name="location",
            field=models.CharField(blank=True, max_length=255, unique=True),
        ),
    ]
