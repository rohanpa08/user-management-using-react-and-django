from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin, Group, Permission

# Create your models here.


class AuthUserManager(BaseUserManager):
  def create_user(self, email, password, username=None,  **extra_fields):
    """
    Create and save a user with the given email, and password.
    """
    if not email:
        raise ValueError("The Email must be set")
    email = self.normalize_email(email)
    if username is None:
        username = email
    user = self.model(username=username, email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user
  
  def create_superuser(self, email, password, username=None,  **extra_fields):
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)
    return self.create_user(email, password, username, **extra_fields)

class AuthUser(AbstractBaseUser, PermissionsMixin):
  username = models.CharField(max_length=150, blank=True, null=True)
  email = models.EmailField(unique=True)
  phone = models.CharField(max_length=30, blank=True, null=True)
  first_name = models.CharField(max_length=30, blank=True)
  last_name = models.CharField(max_length=30, blank=True)
  is_active = models.BooleanField(default=True)
  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)

  objects = AuthUserManager()

  USERNAME_FIELD = "email"
  REQUIRED_FIELDS = ['first_name', 'last_name', 'phone']

  groups = models.ManyToManyField(
      Group,
      related_name='auth_user_set', 
      blank=True,
      help_text='The groups this user belongs to.',
      verbose_name='groups'
    )

  user_permissions = models.ManyToManyField(
    Permission,
    related_name='auth_user_set',  
    blank=True,
    help_text='Specific permissions for this user.',
    verbose_name='user permissions'
  )

  def __str__(self):
    return self.email




"""
def add(*x):
  print([1, 2, 3])
  return 


  
add(1, 2, 3)

"""