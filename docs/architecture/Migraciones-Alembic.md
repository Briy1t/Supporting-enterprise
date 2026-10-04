# Migraciones con Alembic — Supporting Enterprise

Alembic permite gestionar cambios en la base de datos de forma profesional, evitando el uso de `Base.metadata.create_all`.

## 1. Instalación
pip install alembic
alembic init alembic

## 2. Configuración
En alembic.ini:
- Configurar sqlalchemy.url o dejarla vacía para cargar desde variables de entorno.

En alembic/env.py:
- Importar Base y todos los modelos:
from app.database import Base
from app.models import *

target_metadata = Base.metadata

## 3. Crear migración
alembic revision --autogenerate -m "crear tablas iniciales"

## 4. Aplicar migración
alembic upgrade head

## Flujo de trabajo diario
1. Modificar un modelo.
2. Ejecutar:
   alembic revision --autogenerate -m "cambio X"
3. Revisar archivo generado.
4. Ejecutar:
   alembic upgrade head

## Ventajas
- Control de versiones de la base.
- Migraciones seguras.
- Historial de cambios.
- Integración con CI/CD futura.
