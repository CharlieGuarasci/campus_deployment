# Generated by Django 5.1.6 on 2025-03-14 14:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="listing",
            name="author",
        ),
        migrations.RemoveField(
            model_name="listing",
            name="edition",
        ),
        migrations.RemoveField(
            model_name="listing",
            name="course_code",
        ),
        migrations.RemoveField(
            model_name="listing",
            name="condition",
        ),
        migrations.CreateModel(
            name="RideShare",
            fields=[
                (
                    "listing_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="listings.listing",
                    ),
                ),
                ("pickup_location", models.CharField(max_length=255)),
                ("dropoff_location", models.CharField(max_length=255)),
                (
                    "mode_of_travel",
                    models.CharField(
                        choices=[
                            ("TRAIN", "Train"),
                            ("PLANE", "Plane"),
                            ("AUTOMOBILE", "Automobile"),
                            ("BUS", "Bus"),
                            ("OTHER", "Other"),
                        ],
                        default="Automobile",
                        max_length=255,
                    ),
                ),
                ("date_of_travel", models.DateTimeField(blank=True, null=True)),
            ],
            bases=("listings.listing",),
        ),
        migrations.CreateModel(
            name="Roommates",
            fields=[
                (
                    "listing_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="listings.listing",
                    ),
                ),
                (
                    "year",
                    models.CharField(
                        choices=[
                            ("First Year", "First Year"),
                            ("Second Year", "Second Year"),
                            ("Third Year", "Third Year"),
                            ("Fourth Year", "Fourth Year"),
                            ("Fifth Year or Above", "Fifth Year or Above"),
                            ("Graduate Student", "Graduate Student"),
                        ],
                        default="First Year",
                        max_length=255,
                    ),
                ),
                ("age", models.IntegerField()),
                (
                    "gender",
                    models.CharField(
                        choices=[
                            ("male", "Male"),
                            ("female", "Female"),
                            ("non_binary", "Non-binary"),
                            ("other", "Other"),
                            ("prefer_not_to_say", "Prefer not to say"),
                        ],
                        default="prefer_not_to_say",
                        max_length=255,
                    ),
                ),
                ("program", models.CharField(max_length=255)),
                (
                    "social_media",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                ("additional_information", models.TextField(blank=True, null=True)),
            ],
            bases=("listings.listing",),
        ),
        migrations.CreateModel(
            name="SubletListing",
            fields=[
                (
                    "listing_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="listings.listing",
                    ),
                ),
                ("house_address", models.TextField()),
                ("rooms", models.IntegerField()),
                ("length_of_stay", models.CharField(max_length=255, null=True)),
                (
                    "year",
                    models.CharField(
                        choices=[
                            ("First Year", "First Year"),
                            ("Second Year", "Second Year"),
                            ("Third Year", "Third Year"),
                            ("Fourth Year", "Fourth Year"),
                            ("Fifth Year or Above", "Fifth Year or Above"),
                            ("Graduate Student", "Graduate Student"),
                        ],
                        default="First Year",
                        max_length=255,
                    ),
                ),
            ],
            bases=("listings.listing",),
        ),
        migrations.AlterField(
            model_name="listing",
            name="image",
            field=models.ImageField(blank=True, null=True, upload_to="listing_images/"),
        ),
        migrations.CreateModel(
            name="BookListing",
            fields=[
                (
                    "listing_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="listings.listing",
                    ),
                ),
                ("author", models.CharField(max_length=255)),
                ("edition", models.CharField(blank=True, max_length=50, null=True)),
                (
                    "course_code",
                    models.CharField(blank=True, max_length=255, null=True),
                ),
                (
                    "condition",
                    models.CharField(
                        choices=[("Poor", "Poor"), ("Fair", "Fair"), ("Good", "Good")],
                        default="Fair",
                        max_length=255,
                    ),
                ),
                ("pickup_location", models.CharField(max_length=255)),
            ],
            bases=("listings.listing",),
        ),
        migrations.CreateModel(
            name="EventsAndOther",
            fields=[
                (
                    "listing_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="listings.listing",
                    ),
                ),
                (
                    "condition",
                    models.CharField(
                        blank=True,
                        choices=[("Poor", "Poor"), ("Fair", "Fair"), ("Good", "Good")],
                        default="Fair",
                        max_length=255,
                        null=True,
                    ),
                ),
            ],
            bases=("listings.listing",),
        ),
    ]
