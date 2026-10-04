# Procedimiento de Recreación de Tablas — Supporting Enterprise

## Contexto
Cuando dos máquinas FastAPI crean tablas con modelos distintos, la base se corrompe.  
Para evitar esto, solo una máquina debe ejecutar la creación de tablas.

## Procedimiento oficial

### 1. Apagar ambas máquinas FastAPI
Evita que intenten crear tablas simultáneamente.

### 2. Eliminar tablas corruptas

```bash
DROP TABLE usuarios CASCADE;
DROP TABLE servicios CASCADE;
DROP TABLE alarmas CASCADE;
DROP TABLE tecnicos CASCADE;
DROP TABLE tickets CASCADE;
DROP TABLE leads CASCADE;
```

### 3. Encender solo la máquina correcta
La máquina con el backend actualizado debe ser la única que ejecute:
Base.metadata.create_all()
o
alembic upgrade head

### 4. Encender la segunda máquina
Esta máquina solo debe **usar** las tablas, nunca crearlas.

## Regla empresarial
**Solo una instancia crea tablas.  
Las demás solo las consumen.**
