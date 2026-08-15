# Configuración Técnica de Alembic — Supporting Enterprise

## alembic.ini
Configurar sqlalchemy.url o dejarla vacía para cargar desde variables de entorno.

## env.py
from app.database import Base
from app.models import *

target_metadata = Base.metadata

## Migraciones
alembic revision --autogenerate -m "mensaje"
alembic upgrade head

## Importante
Alembic debe ver todos los modelos para generar migraciones correctas.
