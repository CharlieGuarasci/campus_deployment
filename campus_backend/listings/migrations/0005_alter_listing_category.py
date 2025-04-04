# Generated by Django 5.1.6 on 2025-03-14 16:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0004_remove_booklisting_condition_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="listing",
            name="category",
            field=models.CharField(
                choices=[
                    ("BOOKS", "Books"),
                    ("SUBLETS", "Sublets"),
                    ("ROOMMATES", "Roommates"),
                    ("RIDESHARE", "Rideshare and Travel"),
                    ("EVENTS", "Events"),
                    ("OTHER", "Other"),
                ],
                default="OTHER",
                max_length=20,
            ),
        ),
    ]
