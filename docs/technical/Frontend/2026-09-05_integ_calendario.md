# Frontend — 05/09/2026

## 1. Integración del Módulo de Calendario

### Diagnóstico de Compatibilidad y Resolución de Entorno
* **Incompatibilidad de Framework:** Se identificó que la biblioteca **FullCalendar** carece de soporte nativo para **React 19**, interrumpiendo el flujo de renderizado en el cliente debido a excepciones de constructores.
* **Acción de Mitigación:** Se realizó un descenso controlado de versión (*downgrade*) en el núcleo de la aplicación hacia **React 18** y su respectivo entorno de ejecución en el DOM (`react-dom@18`).
* **Saneamiento:** Se procedió con la reinstalación completa de las dependencias asociadas del ecosistema de FullCalendar (`@fullcalendar/react`, `daygrid`, `timegrid`, e `interaction`) para asegurar la estabilidad del componente visual.

---

## 2. Requerimientos del Botón “Crear Cita”

El componente interactivo encargado de agendar nuevos servicios debe implementar un flujo modular con las siguientes directivas secuenciales:
* **Disparador visual:** Apertura automática de una ventana modal al accionar el control.
* **Mapeo de operario:** Selector para vincular la incidencia con un especialista de la plantilla (`tecnico_id`).
* **Mapeo de cuenta:** Selector para vincular la orden con el perfil del usuario afectado (`cliente_id`).
* **Parámetros cronológicos:** Campos dedicados para la asignación y validación de la fecha y hora de la visita técnica.
* **Sincronización:** Despacho de la petición asíncrona hacia la capa del backend para su posterior persistencia.

---

## 3. Lógica de Control de Turnos en la Interfaz

Para garantizar la usabilidad de la agenda empresarial, el componente del calendario debe responder de forma nativa a los siguientes eventos de interacción:
* **Mutación dinámica:** Permitir la modificación o cambio de turnos de manera interactiva al tocar o arrastrar bloques dentro de la cuadrícula del calendario.
* **Bloqueo horario:** Habilitar controles para restringir franjas horarias específicas (pausas, capacitaciones o indisponibilidad).
* **Edición de eventos:** Capacidad para abrir y actualizar los metadatos o descripciones de las citas preexistentes.
* **Remoción física/lógica:** Permitir la eliminación de eventos o cancelaciones de citas de forma directa en el panel.

---

## 4. Diagnóstico de Estado y Bloqueo Operativo

### Dependencia de Servicios Críticos
* **Bloqueo Remoto:** El módulo de calendario se declara actualmente en estado **inoperable**. La interfaz de usuario del cliente experimenta congelamiento de componentes y fallos generalizados de red.
* **Causa Raíz:** El servidor FastAPI se encuentra caído y fuera de línea en el entorno de desarrollo debido a una excepción crítica por errores de importación circular en sus enrutadores.
* **Impacto Inmediato:** El componente visual de la agenda no logra cargar su estructura, el backend rechaza los payloads de creación de citas y el panel es incapaz de recuperar o renderizar los turnos existentes.
