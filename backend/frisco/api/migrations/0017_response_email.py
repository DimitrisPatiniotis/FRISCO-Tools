# Generated by Django 4.0.3 on 2023-11-13 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_alter_option_weight_alter_question_weight'),
    ]

    operations = [
        migrations.AddField(
            model_name='response',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
    ]
