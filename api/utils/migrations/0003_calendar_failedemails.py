# Generated by Django 2.0.2 on 2018-03-21 23:30

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('utils', '0002_auto_20180321_2324'),
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tick', models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='FailedEmails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender', models.EmailField(max_length=254, verbose_name='Sender')),
                ('recipient', models.TextField(verbose_name='Recipient')),
                ('content', models.TextField(verbose_name='Email Content')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('excepion_type_and_value', models.TextField(verbose_name='Excepion Type and Value')),
                ('exception_traceback', models.TextField(verbose_name='TraceBack')),
            ],
        ),
    ]
