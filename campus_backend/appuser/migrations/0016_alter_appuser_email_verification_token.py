# Generated by Django 5.1.6 on 2025-03-24 22:38

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ("appuser", "0013_appuser_email_verification_sent_at_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appuser",
            name="email_verification_token",
            field=models.UUIDField(null=True, blank=True),
        ),
    ]
