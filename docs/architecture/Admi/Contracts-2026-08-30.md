# Arquitectura del Sistema — Contratos — 30/08/2026

Este documento define las directivas de arquitectura, los flujos lógicos de control y las reglas operacionales que rigen el ciclo de vida de la renovación de contratos y los procesos automáticos del sistema.

---

## 1. Arquitectura del Flujo de Renovación

El proceso de extensión comercial y contractual se diseña bajo un patrón secuencial y síncrono para garantizar la atomicidad de los estados en la base de datos:

```text
Contrato Activo ➔ Detección de Vencimiento ➔ Acción Administrativa ➔ Generación de Contrato ➔ Creación de Historial ➔ Envío de Correo ➔ Actualización de Estado del Cliente
```

### Secuencia Lógica del Ciclo:
1. **Estado Inicial:** La entidad `Cliente` mantiene un registro con un contrato en estado `activo`.
2. **Detección Automática:** El sistema identifica la proximidad del fin de vigencia del acuerdo mediante el daemon de monitoreo.
3. **Disparador Operativo:** El personal administrativo ejecuta la orden desde la interfaz de la plataforma.
4. **Mutación y Persistencia:** 
   * Se genera una nueva entidad de contrato con sus llaves y referencias correspondientes.
   * Se inserta un registro histórico indexado dentro de la tabla `historial_contratos`.
5. **Comunicaciones:** El sistema despacha una notificación electrónica automatizada hacia la dirección del contacto.
6. **Sincronización de Perfil:** Se actualiza el campo `estado_cliente` a su valor correspondiente dentro del modelo del cliente.

---

## 2. Subsistema de Alertas Automáticas

### Arquitectura Recomendada
Para la automatización de tareas programadas sin bloquear los hilos principales de la API, se adopta la siguiente infraestructura descentralizada:

* **Motor de Programación:** Uso de la biblioteca `APScheduler` para administrar los trabajos en segundo plano del servidor.
* **Frecuencia de Ejecución:** Configuración de un trabajo diario (*Job*) programado en horas de baja demanda operativa para mitigar la carga del servidor de base de datos.
* **Módulo de Comunicaciones:** Integración directa con el cliente SMTP centralizado para el despacho de alertas hacia el cliente externo.
* **Módulo de Mensajería Interna:** Integración con el sistema de notificaciones en tiempo real o almacenamiento de alertas en el panel administrativo para el consumo del personal de la plataforma.

---

## 3. Regla Arquitectónica de Servicios Contratados

Para salvaguardar la integridad de los acuerdos legales y evitar discrepancias de facturación o auditoría, se define el siguiente principio de diseño de software:

* **Inmutabilidad en el Cliente (Frontend):** Las prestaciones y servicios quedan estrictamente bloqueados y fijados en el contrato al momento de su firma original. 
* **Modo Consulta:** La interfaz de usuario del frontend debe inhabilitar cualquier control de edición, mutación o reinserción de servicios durante el flujo de renovación. Los datos se recuperan exclusivamente para propósitos de renderizado y visualización pasiva (*Read-Only*).
