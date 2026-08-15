# Flujo Web → Plataforma — Supporting Enterprise

## Paso 1 — El cliente envía formulario
La web guarda:
- contacto
- acceso_empresas
- integracion
- demo_guiada

## Paso 2 — La web envía el lead a la plataforma
POST /admin/forms/importar

## Paso 3 — El admin revisa el lead
/admin/forms/
/admin/forms/{id}

## Paso 4 — Si se cierra contrato → convertir lead
POST /admin/forms/{id}/convertir

Esto crea:
- cliente
- usuario (auth)
- credenciales
- servicios (más adelante)

## Paso 5 — El cliente accede a la plataforma
Puede:
- ver técnicos
- crear tickets
- ver servicios
- ver incidencias

## Paso 6 — Futuro
- horarios técnicos
- app de monitoreo
- microservicio Java
- alarmas en tiempo real
- panel avanzado
- escalado AWS
- dockerización
- migración a Cloud Run
