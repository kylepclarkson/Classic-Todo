# Generated by Django 3.2.3 on 2021-05-23 19:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_session_id_todo_session_key'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='session_key',
        ),
    ]