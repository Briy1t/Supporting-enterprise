# ADR-020 — Módulo Interno de Cliente y Estados de Formularios

## Decisión
Crear un módulo interno de cliente (`/clientes/{id}`) y gestionar estados de formularios (`pendiente`, `convertido`, `descartado`) para evitar duplicados y saturación.

## Razones

- Administración limpia.
- Evitar triple duplicación (solicitudes, usuarios, clientes).
- Centralizar información del cliente.
- Conectar servicios contratados y tickets en una sola vista.
- Permitir preferencias de contacto y servicios múltiples.

## Consecuencias

- Nuevas columnas en tablas de formularios:
  - `estado`
  - servicios multi elección
  - preferencia de contacto
- Nuevas validaciones en creación de cliente:
  - email único
  - usuario único
  - empresa única
- Cambios en frontend de Administración:
  - “Crear cliente” → crea y limpia.
  - “Descartar” → elimina de la vista.

## Resultado esperado
Sistema sin duplicados, administración ordenada y módulo de cliente completo y útil.
