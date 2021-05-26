# Generated by Django 3.1.2 on 2021-05-25 22:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('newspaperapp', '0002_auto_20210525_1500'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='author',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='articles', to='newspaperapp.author'),
        ),
    ]
