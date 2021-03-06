# Generated by Django 2.0.2 on 2018-04-07 14:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20180321_2324'),
    ]

    operations = [
        migrations.AddField(
            model_name='sauser',
            name='password_reset_token',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='sauser',
            name='user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sa_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
