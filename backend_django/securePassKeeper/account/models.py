import base64
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend

from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
from global_utils.models import TimestampedModelMixin


# Create your models here.
class ExtendedUser(AbstractUser, TimestampedModelMixin):
    user_salt_bytecode = models.BinaryField()
    email = models.EmailField(unique=True)
    phone = PhoneNumberField(unique=True)
    username = models.CharField(max_length=50, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []



    def get_user_encryption_key(self, user_raw_password):
        user_salt_bytecode = self.user_salt_bytecode.tobytes()
        password_byte = user_raw_password.encode('utf-8')
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            iterations=100000,  # Adjust the number of iterations based on your security requirements
            salt=user_salt_bytecode,
            length=32  # Length of the derived key
        )
        user_encryption_key = kdf.derive(password_byte)
        # Encode the derived key using base64 with URL-safe characters
        user_encryption_fernet_key = base64.urlsafe_b64encode(user_encryption_key)
        return user_encryption_fernet_key
    

