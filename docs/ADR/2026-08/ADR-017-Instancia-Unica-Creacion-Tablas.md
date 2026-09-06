# ADR-017 — Solo una instancia FastAPI debe crear las tablas

## Decisión
Establecer que únicamente una máquina FastAPI será responsable de crear las tablas en la base de datos.  
Las demás máquinas solo consumirán la estructura existente.

## Razones
- Evitar corrupción de tablas.
- Evitar columnas duplicadas o inconsistentes.
- Evitar relaciones antiguas mezcladas con modernas.
- Evitar errores 500 en endpoints críticos.
- Mantener integridad del esquema.

## Consecuencias
- La máquina principal debe ejecutarse primero.
- Las máquinas secundarias deben tener deshabilitado create_all.
- Alembic debe ser usado como sistema oficial de migraciones.

## Resultado esperado
Base de datos coherente, estable y sin conflictos entre instancias.

