# Generated by Django 4.0.3 on 2023-09-28 00:40

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_questionnaire_outro_text_questionnaire_outro_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='option',
            name='goto',
            field=models.IntegerField(default=-1, help_text='Enter a value of -1 or greater.', validators=[django.core.validators.MinValueValidator(-1)]),
        ),
    ]
