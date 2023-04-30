from django.db import models
from djongo.models import ObjectIdField

class Persona(models.Model):
    _id = ObjectIdField(primary_key=True)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    telefono = models.CharField(max_length=20)

    objects = models.Manager()

