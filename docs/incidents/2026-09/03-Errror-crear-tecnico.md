## Incidencias — 03/09/2026

### 1. Error al crear técnico
* **Síntoma:** El formulario de alta e inicialización del perfil de técnico no procesa la solicitud correctamente.
* **Causa Raíz:** Desalineación en el contrato de datos. El servidor backend exige la inyección de credenciales completas de acceso, mientras que la interfaz del frontend envía un payload incompleto. El sistema requiere una función de generación automática de credenciales que actualmente no se encuentra implementada.

---

### 2. Error crítico: Entorno virtual (venv) corrupto
* **Síntoma:** El sistema de control de versiones Git detecta y reporta de forma masiva modificaciones y eliminaciones anómalas dentro del directorio `site-packages`:
  ```text
  deleted: pip/_vendor/tenacity/...
  modified: pip/_vendor/tomli/_parser.py
  deleted: pip/_vendor/urllib3/request.py
  ```
* **Causa Raíz:** El entorno virtual (`venv`) local se encuentra dañado y, debido a la ausencia de restricciones, está siendo versionado de forma incorrecta por Git dentro del repositorio.
* **Impacto:** Aparición de excepciones aleatorias en el entorno, fallos críticos en la librería criptográfica `bcrypt`, errores de ejecución en el gestor `pip`, interrupción en la resolución de importaciones y comportamiento inestable en la ejecución de migraciones.
* **Acción de Mitigación Requerida:** Recrear el entorno virtual desde cero, reinstalar la totalidad de las dependencias del proyecto, purgar el directorio `venv` del historial del repositorio e indexarlo de forma inmediata en el archivo `.gitignore`.

---

### 3. Migración de Alembic alterada manualmente
* **Síntoma:** El motor de migraciones Alembic es incapaz de detectar o procesar el último script de actualización del esquema.
* **Causa Raíz:** Modificación manual de la arquitectura de archivos. Un script de migración fue movido de su directorio nativo, rompiendo el árbol cronológico de versiones de la herramienta.
* **Impacto:** Ejecución de migraciones incompletas, ausencia física de tablas en el motor de base de datos y excepciones por inconsistencia en las relaciones del ORM.

---

### 4. Técnicos inicializados en base de datos sin clave de acceso
* **Síntoma:** Las entidades de los técnicos son persistidas con éxito en la base de datos, pero carecen de credenciales de autenticación asociadas.
* **Causa Raíz:** Falta de acoplamiento en el backend. El flujo de creación de técnicos carece de integración con la tabla centralizada de `usuarios`, omitiendo la generación automática de contraseñas (*passwords*) y el posterior envío de accesos al personal.

---

### 5. Error en asignación de técnico al cliente
* **Síntoma:** El perfil detallado de los clientes no refleja ni actualiza la entidad del técnico asignado para su soporte.
* **Causa Raíz:** Falla en la comunicación entre capas. El controlador del backend omite la persistencia del atributo `tecnico_id` debido a que la interfaz de usuario no transmite dicho valor, o bien está apuntando a un endpoint incorrecto.

---

### 6. Error en el panel de control técnico
* **Síntoma:** La interfaz del panel técnico se congela y no renderiza información ni métricas operativas.
* **Causa Raíz:** Ausencia total de infraestructura en el servidor. Las rutas de la API necesarias no han sido implementadas, provocando que los componentes y *hooks* del frontend realicen consultas asíncronas hacia endpoints inexistentes.
