# Generated by Django 4.2.7 on 2023-11-24 11:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_remove_extendeduser_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='extendeduser',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]