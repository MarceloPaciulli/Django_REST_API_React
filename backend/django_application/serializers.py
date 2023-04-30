from rest_framework import serializers
from .models import Persona
from bson import ObjectId


class MyField(serializers.Field):
    def to_representation(self, value):
        try:
            if isinstance(value, ObjectId):
                return str(value)
            return int(value)
        except (TypeError, ValueError):
            return value

    def to_internal_value(self, data):
        try:
            return int(data)
        except (TypeError, ValueError):
            return data



class PersonaSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source='_id', read_only=True)

    class Meta:
        model = Persona
        fields = ['id', 'nombre', 'apellido', 'email', 'telefono']


