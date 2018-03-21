# Generated by Django 2.0.2 on 2018-03-21 23:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sauser',
            name='user',
            field=models.OneToOneField(editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sa_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
