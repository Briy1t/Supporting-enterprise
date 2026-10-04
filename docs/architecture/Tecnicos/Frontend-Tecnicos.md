# Página de Técnicos — Arquitectura Frontend

La página de Técnicos muestra los técnicos disponibles y su información relevante.

## Estado actual (versión temporal)
Se utilizan datos estáticos provenientes de la web:

- Nombre
- Especialidad
- Descripción

Ejemplo:
- Laura Martínez — Soporte IT
- Carlos Gómez — Hardening
- Andrea Ruiz — Monitorización
- Javier Torres — Redes

## Estructura JSX actual
La página contiene tarjetas con información de cada técnico.

## Versión futura (dinámica con API)
La página se conectará al backend mediante:

GET /tecnicos

Ejemplo de implementación:
- useEffect para cargar técnicos
- useState para almacenar datos
- Render dinámico de tarjetas

## Objetivo
Convertir la página en un módulo dinámico que muestre:
- Técnicos disponibles
- Especialidades
- Descripciones
- Disponibilidad en tiempo real
