# Arquitectura de Tickets — Supporting Enterprise

Un ticket es una incidencia o tarea que un técnico debe resolver para un cliente.

## Datos del ticket
- Cliente
- Técnico asignado
- Servicio relacionado
- Estado (Pendiente, En progreso, Resuelto)
- Prioridad
- Fecha
- Historial de acciones

## Niveles de la plataforma

### Nivel 1 — Plataforma Global (Administración)
- Todos los tickets del sistema
- Tickets por técnico
- Tickets por cliente
- Tickets por servicio
- Alertas que generaron tickets
- Métricas globales
- Patrones detectados

### Nivel 2 — Panel del Técnico
Cada técnico ve:
- Sus clientes asignados
- Sus tickets pendientes
- Sus tickets resueltos
- Sus horarios
- Sus alertas
- Sus métricas personales

## Relación entre tickets, alertas y técnicos
- Una alerta puede generar un ticket.
- Un técnico recibe el ticket.
- El técnico actualiza estado, notas y archivos.
- La plataforma registra todo para auditoría.
