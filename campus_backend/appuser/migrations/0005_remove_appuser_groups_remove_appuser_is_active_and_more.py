# Generated by Django 5.1.6 on 2025-03-07 17:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("appuser", "0004_appuser_groups_appuser_is_active_appuser_is_staff_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="appuser",
            name="groups",
        ),
        migrations.RemoveField(
            model_name="appuser",
            name="is_active",
        ),
        migrations.RemoveField(
            model_name="appuser",
            name="is_staff",
        ),
        migrations.RemoveField(
            model_name="appuser",
            name="is_superuser",
        ),
        migrations.RemoveField(
            model_name="appuser",
            name="last_login",
        ),
        migrations.RemoveField(
            model_name="appuser",
            name="user_permissions",
        ),
        migrations.AlterField(
            model_name="appuser",
            name="email",
            field=models.CharField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name="appuser",
            name="password",
            field=models.TextField(),
        ),
    ]
