# Generated by Django 2.0.2 on 2018-10-27 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('markets', '0018_item_marketplace'),
    ]

    operations = [
        migrations.AddField(
            model_name='marketplace',
            name='active',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='marketplacemembership',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
