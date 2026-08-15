# Auto Migración de Estado en Formularios — Supporting Enterprise

Se propone crear `app/auto_migrate.py` para añadir columnas sin tocar la web pública.

## Objetivo

- Añadir columna `estado` a las tablas de formularios.
- Añadir columnas para:
  - servicios multi elección
  - preferencia de contacto (WhatsApp, correo, teléfono)

## Ventajas

- No requiere modificar la web pública.
- No requiere ejecutar SQL manual desde la web.
- No rompe formularios ya enviados.
- Permite filtrar por estado (`pendiente`, `convertido`, `descartado`).
- Permite que la plataforma marque formularios como convertidos o descartados.

## Resultado

La plataforma puede:
- Limpiar “Solicitudes de Clientes”.
- Evitar duplicados.
- Gestionar mejor el ciclo de vida de cada lead.
