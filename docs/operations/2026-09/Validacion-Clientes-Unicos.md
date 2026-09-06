# Validación de Clientes Únicos — Supporting Enterprise

## Problema
Clientes y usuarios duplicados saturan la administración y generan inconsistencias.

## Reglas de validación

- `email` debe ser único.
- `usuario` debe ser único.
- `empresa` debe ser única (según modelo de negocio).
- Un formulario convertido no puede volver a crear cliente.

## Implementación

- Validación en endpoint de creación de cliente.
- Comprobación previa en `auth_log` y tabla de clientes.
- Uso de columna `estado` en formularios para evitar reconversión.

## Objetivo
Garantizar integridad de datos y evitar duplicados en:

- auth_log
- clientes
- solicitudes
