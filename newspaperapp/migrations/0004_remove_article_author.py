# Generated by Django 3.1.2 on 2021-05-25 22:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('newspaperapp', '0003_auto_20210525_2210'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='author',
        ),
    ]