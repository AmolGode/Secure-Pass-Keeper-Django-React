"""
WSGI config for securePassKeeper project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os
from dotenv import load_dotenv

load_dotenv()

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE','securePassKeeper.settings.{}'.format(os.environ.get('ENVIRONMENT')))
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'securePassKeeper.settings')

application = get_wsgi_application()
