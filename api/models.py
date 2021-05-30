from django.db import models
from django.contrib.auth.models import User

class Todo(models.Model):

    user = models.ForeignKey(User, related_name='todos', on_delete=models.CASCADE, null=True)
    text = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text