# Administración de Formularios y Estados — Supporting Enterprise

## Objetivo
Mantener la sección de “Solicitudes de Clientes” limpia y sin duplicados.

## Estados de formularios

- `pendiente` → formulario recién recibido.
- `convertido` → ya se creó cliente y usuario.
- `descartado` → no se convertirá en cliente.

## Comportamiento esperado

- Formularios `convertido`:
  - No aparecen más en “Solicitudes”.
- Formularios `descartado`:
  - Se eliminan de la lista visible.
- Botón “Crear cliente”:
  - Crea usuario y cliente.
  - Marca el formulario como `convertido`.
- Botón “Descartar”:
  - Marca el formulario como `descartado`.
  - Lo elimina de la vista.

## Conexión con la web

La web:
- Recibe formularios.
- Guarda leads.

La plataforma:
- Importa leads.
- Gestiona estados.
- Convierte leads en clientes reales.
