# Arquitectura de Clientes — Supporting Enterprise

## 1. Formularios como fuente de datos
Tablas:
- acceso_empresas
- contactos
- demo_guiada
- integracion_personalizada

Endpoints:
GET /admin/formularios/acceso_empresas
GET /admin/formularios/contactos
GET /admin/formularios/demo_guiada
GET /admin/formularios/integraciones
GET /admin/formularios/todos

## 2. Crear o descartar cliente
Crear:
POST /admin/clientes/crear-desde-formulario

Descartar:
POST /admin/formularios/{tipo}/{id}/descartar

## 3. Sección Clientes
GET /clientes
GET /clientes/{id}
DELETE /clientes/{id}

## 4. Servicios y estadísticas
GET /servicios
GET /estadisticas/servicios

Ejemplo:
[
  { "servicio": "Hardening", "clientes": 5 },
  { "servicio": "Monitorización", "clientes": 8 }
]

## 5. Técnicos y alarmas
Por ahora estáticos:
GET /tecnicos
GET /alarmas
