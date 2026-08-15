# ADR-018 — Separación Total entre Web y Plataforma

## Decisión
La web corporativa y la plataforma empresarial deben tener tablas separadas, incluso si comparten la misma base de datos.

## Razones
- Evitar corrupción de tablas.
- Evitar conflictos entre modelos Pydantic v1 y v2.
- Evitar errores 500.
- Mantener independencia de sistemas.
- Facilitar sincronización futura mediante endpoints internos.

## Consecuencias
- La web usa BaseWeb.
- La plataforma usa Base.
- Las tablas se crean manualmente en la web.
- Las tablas se crean con Alembic en la plataforma.
