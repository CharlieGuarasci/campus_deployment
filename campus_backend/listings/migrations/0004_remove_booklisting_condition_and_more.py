# Generated by Django 5.1.6 on 2025-03-14 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0003_listing_category"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="booklisting",
            name="condition",
        ),
        migrations.RemoveField(
            model_name="eventsandother",
            name="condition",
        ),
        migrations.AddField(
            model_name="listing",
            name="condition",
            field=models.CharField(
                blank=True,
                choices=[("Poor", "Poor"), ("Fair", "Fair"), ("Good", "Good")],
                default="Fair",
                max_length=255,
                null=True,
            ),
        ),
        migrations.AlterField(
            model_name="listing",
            name="category",
            field=models.CharField(
                choices=[
                    ("Books", "Books"),
                    ("Sublets", "Sublets"),
                    ("Roommates", "Roommates"),
                    ("Rideshare", "Rideshare and Travel"),
                    ("Events", "Events"),
                    ("Other", "Other"),
                ],
                default="OTHER",
                max_length=20,
            ),
        ),
    ]
