# Generated by Django 2.0.2 on 2018-05-19 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('markets', '0013_auto_20180424_2204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='offer',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='offer',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AlterField(
            model_name='waitinglistsubscription',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='waitinglistsubscription',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
