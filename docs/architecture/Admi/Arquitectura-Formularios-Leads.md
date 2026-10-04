# Arquitectura de Formularios y Leads — Supporting Enterprise

Los formularios de la web corporativa son la fuente de datos para crear clientes en la plataforma empresarial.

## Tablas origen
- acceso_empresas
- contactos
- demo_guiada
- integracion_personalizada

## Endpoints
GET /admin/formularios/acceso_empresas
GET /admin/formularios/contactos
GET /admin/formularios/demo_guiada
GET /admin/formularios/integraciones
GET /admin/formularios/todos

## Crear cliente desde formulario
POST /admin/clientes/crear-desde-formulario

Backend:
- Lee el registro origen.
- Crea un usuario con rol cliente.
- Opcional: asigna servicio inicial.

## Descartar formulario
POST /admin/formularios/{tipo}/{id}/descartar

## Sección Clientes
GET /clientes
GET /clientes/{id}
DELETE /clientes/{id}

## Servicios y estadísticas
GET /servicios
GET /estadisticas/servicios

Ejemplo:
[
  { "servicio": "Hardening", "clientes": 5 },
  { "servicio": "Monitorización", "clientes": 8 }
]
