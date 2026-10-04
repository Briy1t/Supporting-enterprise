# INCIDENT LOG — Clientes duplicados y administración saturada

## Fecha
14/08/2026

## Descripción del incidente
El sistema presenta clientes y usuarios duplicados en varios módulos:

- Formularios convertidos que siguen apareciendo en “Solicitudes de Clientes”.
- Formularios que deberían estar descartados pero siguen visibles.
- Usuarios duplicados en `auth_log`.
- Clientes repetidos en la sección de clientes.

## Síntomas
- Triple aparición del mismo cliente:
  - En “Solicitudes de Clientes”.
  - En “Usuarios del sistema”.
  - En “Clientes”.
- Formularios convertidos que aún se muestran como pendientes.
- Administración saturada de registros que ya no deberían existir.

## Causa raíz
- No se valida:
  - email único
  - usuario único
  - empresa única
- Los formularios no cambian de estado tras convertirlos.
- El botón “Crear cliente” no elimina ni marca el formulario como convertido.
- El botón “Descartar” no elimina realmente el formulario.

## Resultado esperado
- Formularios convertidos desaparecen de “Solicitudes”.
- Formularios descartados no vuelven a aparecer.
- Clientes y usuarios sin duplicados.
