# Generated by Django 2.1.4 on 2019-02-03 08:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_auto_20190131_0307'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='business',
            name='username',
        ),
        migrations.RemoveField(
            model_name='customer',
            name='username',
        ),
        migrations.RemoveField(
            model_name='subscription',
            name='username',
        ),
        migrations.AddField(
            model_name='business',
            name='business_id',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customer',
            name='customer_id',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='subscription',
            name='business_id',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
