# Generated by Django 4.2.7 on 2023-11-24 11:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_extendeduser_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='extendeduser',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default='2023-11-24'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='extendeduser',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, default='2023-11-24'),
        ),
    ]