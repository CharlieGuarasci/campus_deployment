# Generated by Django 5.1.6 on 2025-03-25 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("appuser", "0020_alter_appuser_location_alter_appuser_username"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appuser",
            name="location",
            field=models.CharField(blank=True, default="", max_length=255, null=True),
        ),
    ]
