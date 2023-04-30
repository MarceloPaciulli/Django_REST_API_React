"""
WSGI config for django_project project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
import sys

from django.core.wsgi import get_wsgi_application
from django_project.settings import *


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_project.settings")
sys.path.append('../django_application')


application = get_wsgi_application()
