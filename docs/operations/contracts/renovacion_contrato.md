# Operaciones — Contratos — 30/08/2026

## 1. Renovación de Contrato

### Especificaciones del Flujo
El proceso de renovación debe ejecutar de manera atómica las siguientes directivas en el sistema:
* **Actualización temporal:** Modificar el campo `fecha_inicio` con la fecha del día de la transacción.
* **Extensión de vigencia:** Calcular y actualizar el campo `fecha_fin` según el nuevo periodo contratado.
* **Auditoría:** Crear un registro histórico indexado dentro de la tabla `historial_contratos`.
* **Notificación:** Despachar un correo electrónico automatizado de confirmación de renovación hacia el cliente.
* **Ciclo de vida:** Modificar el estado comercial de la entidad del cliente.

**Estado Actual:** Bloqueo crítico del flujo; ninguna de las acciones descritas es procesada por el servidor backend.

---

## 2. Alertas Automáticas de Vencimiento

### Requerimientos de Infraestructura
Para prevenir la expiración de acuerdos sin seguimiento comercial, se requiere la implementación de un proceso en segundo plano:

* **Planificador de Tareas:** Implementación de un trabajo programado (*Cron Task*) con ejecución diaria obligatoria a las **09:00 AM**.
* **Dependencia Tecnológica:** Incorporación de la librería `APScheduler` en el entorno del backend.
  ```bash
  pip install apscheduler
  ```

### Lógica del Daemon de Monitoreo
La función asíncrona deberá realizar el escaneo diario de la base de datos bajo los siguientes criterios:
1. **Fase de Preventa (60 días):** Detectar contratos cuya `fecha_fin` expire exactamente en 60 días.
2. **Fase Crítica (30: días):** Detectar contratos cuya `fecha_fin` expire exactamente en 30 días.
3. **Despacho de Alertas:** Inyectar una notificación interna en el panel de la plataforma administrativa.
4. **Notificación Externa (Opcional):** Emitir un aviso preventivo vía correo electrónico al cliente final.

---

## 3. Subida de Contrato Firmado

### Requerimientos del Componente
El módulo de carga documental debe cumplir con el siguiente comportamiento lógico:
* **Interfaz de Usuario:** Renderizar un campo de entrada (*input*) de tipo archivo en la vista correspondiente.
* **Persistencia Física:** Almacenar el archivo digitalizado en el directorio seguro del servidor.
* **Mutación de Estado:** Actualizar la entidad del contrato y marcar la propiedad binaria como "firmado".
* **Desbloqueo de Entidades:** Habilitar el control operativo que permite la creación e inicialización formal del cliente en el sistema.

**Estado Actual:** Inaccesible. Las peticiones hacia la API devuelven un código de error HTTP `404 Not Found` debido a un enrutamiento incorrecto en el backend.

---

## 4. Servicios Contratados

### Regla de Negocio Estricta
* **Restricción de Mutabilidad:** Durante el flujo exclusivo de renovación, está **estrictamente prohibido** permitir la selección o adición de servicios nuevos.
* **Consistencia Visual:** La interfaz del frontend debe configurarse en modo de solo lectura, desplegando única y exclusivamente las prestaciones vinculadas al contrato original.

---

## 5. Clientes Vencidos

### Modificación del Modelo de Datos
Se requiere la adición y mapeo de un nuevo atributo en la entidad correspondiente:
* **Nueva Columna:** `estado_cliente`
* **Matriz de Valores Permitidos (Enum):**
  * `activo`
  * `vencido`
  * `renovado`
  * `descartado`
