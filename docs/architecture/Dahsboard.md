# Dashboard Empresarial — Supporting Enterprise

El dashboard empresarial es el punto central de visualización del estado general del sistema. Su objetivo es mostrar métricas clave de forma clara, rápida y profesional.

## Métricas principales
- Clientes activos
- Técnicos disponibles
- Servicios contratados
- Alertas activas
- Tickets abiertos

Cada métrica se representa mediante una tarjeta profesional con:
- Sombra suave
- Borde redondeado
- Icono corporativo
- Número destacado
- Título claro

## Datos en tiempo real
El frontend obtiene los datos mediante:
GET /api/dashboard

Ejemplo de respuesta:
{
  "clientes_activos": 32,
  "tecnicos_disponibles": 5,
  "servicios_contratados": 12,
  "alertas_activas": 3,
  "tickets_abiertos": 7
}

## Objetivo
Proporcionar una visión empresarial inmediata del estado del negocio.

se considera integrar un modulo de facturación