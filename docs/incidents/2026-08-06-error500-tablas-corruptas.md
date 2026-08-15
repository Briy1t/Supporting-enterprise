# INCIDENT LOG — Error 500 por conflicto de tablas y modelos

## Fecha
06/08/2026

## Descripción del incidente
El backend SUPPORTING devolvía errores 500 al crear clientes y al acceder a múltiples endpoints.  
Las tablas estaban corruptas debido a que dos máquinas distintas intentaban crear estructuras diferentes en la misma base de datos.

## Síntomas
- Error 500 en /clientes/crear
- Swagger fallando
- Relaciones inconsistentes
- Columnas duplicadas o inexistentes
- Migraciones incompletas
- Tablas parcialmente creadas

## Causa raíz
Dos instancias FastAPI estaban conectadas a la misma base de datos, pero con modelos distintos.

Una instancia:
- Creaba columnas antiguas  
- Creaba relaciones viejas  

La otra instancia:
- Creaba columnas nuevas  
- Creaba relaciones modernas  

Resultado:
- La base quedó corrupta.
- Las APIs devolvían error 500.
- Swagger no podía serializar modelos.

## Solución aplicada
1. Eliminación completa de tablas:

```bash 
DROP TABLE usuarios CASCADE;
DROP TABLE servicios CASCADE;
DROP TABLE alarmas CASCADE;
DROP TABLE tecnicos CASCADE;
DROP TABLE tickets CASCADE;
DROP TABLE leads CASCADE;
```

1. Apagar ambas máquinas FastAPI.

2. Encender **solo la máquina correcta** (la versión nueva del backend).

3. Dejar que SQLAlchemy/Alembic recreara las tablas limpias.

4. Corregir el modelo Pydantic:
from pydantic import ConfigDict
model_config = ConfigDict(from_attributes=True)

Código

## Resultado
- La creación de clientes pasó de error 500 a respuesta 200.
- Swagger volvió a funcionar.
- La base quedó limpia y coherente.