from django.db import models


class Todo(models.Model):

    session_key = models.CharField(max_length=50, null=False)
    text = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)


    def __str__(self) -> str:
        return f'{self.text}'