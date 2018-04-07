# Generated by Django 2.0.2 on 2018-04-07 21:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('markets', '0004_auto_20180407_1622'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='good_faith_money',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='item',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='item',
            name='price',
            field=models.FloatField(default=0),
        ),
    ]
