# Arquitectura de Sincronización Web → Plataforma — Supporting Enterprise

La web corporativa y la plataforma empresarial NO deben compartir tablas.  
Cada una debe tener sus propias tablas y modelos.

## Razón principal
Si comparten tablas:
- La web crea columnas viejas
- La plataforma crea columnas nuevas
- Se pisan
- Se corrompen
- Swagger falla
- Aparecen errores 500

Esto ya ocurrió en producción.

## Opción profesional (la actual)
- Una sola base, pero con tablas separadas por proyecto.

La web:
- No crea tablas automáticamente.
- Usa BaseWeb.
- Tablas creadas manualmente.

La plataforma:
- Usa Base.
- Tablas creadas por Alembic.

## Flujo de integración futura
1. Web funciona sola.
2. Plataforma funciona sola.
3. Crear endpoints internos de sincronización.
4. Relacionar datos entre web → plataforma.

## Objetivo
Mantener independencia total entre sistemas y evitar corrupción de datos.
