from django.db import models
from account.models import ExtendedUser
from global_utils.models import TimestampedModelMixin

# Create your models here.

class PasswordStoreModel(TimestampedModelMixin):
    title = models.CharField(max_length=100)
    description = models.TextField()
    encrypted_password = models.BinaryField()
    user = models.ForeignKey(ExtendedUser, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    