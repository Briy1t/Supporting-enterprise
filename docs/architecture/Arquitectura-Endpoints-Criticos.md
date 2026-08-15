# Endpoints Críticos — Supporting Enterprise

## 1. GET /user/me
Devuelve el usuario autenticado mediante JWT.

Usos:
- Panel del usuario
- Panel del técnico
- Panel del admin
- Formularios internos
- Validación de rol

## 2. GET /user/{id}
Devuelve información detallada de cualquier usuario.

## 3. Importación de formularios desde la web
POST /admin/forms/importar

Flujo:
- La web recibe formularios.
- El backend público los guarda.
- La plataforma los importa.
- El admin los revisa.
- Se convierten en clientes reales.

## 4. Servicios por cliente
POST /clientes/{id}/servicios  
GET /clientes/{id}/servicios

Permite:
- Asignar servicios
- Ver servicios contratados
- Conectar servicios con tickets

## 5. Tickets
Endpoints actuales permiten:
- Crear incidencias
- Asignarlas
- Actualizarlas
- Cerrarlas

Futuro:
- SLA
- Prioridad
- Asignación automática
- Notificaciones
- Integración con alarmas

## 6. Técnicos
Endpoints actuales permiten:
- Crear técnicos
- Ver técnicos
- Actualizar disponibilidad

Futuro:
- Horarios
- Zonas
- Especialidades
- Carga de trabajo

## 7. Alarmas
Arquitectura final:
- Microservicio Java → WebSocket
- Plataforma recibe alertas
- Base almacena
- Panel muestra
- Técnicos reciben notificaciones
