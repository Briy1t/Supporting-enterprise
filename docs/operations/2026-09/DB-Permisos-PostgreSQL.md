# Permisos y Esquemas en PostgreSQL — Supporting Enterprise

## Problema
Las tablas creadas por el backend no aparecían en DBeaver.

## Causa
PostgreSQL separa objetos por usuario.

## Solución
ALTER SCHEMA public OWNER TO supporting_user;

GRANT ALL ON SCHEMA public TO supporting_user;

## Recomendación
Usar siempre supporting_user para el backend.
