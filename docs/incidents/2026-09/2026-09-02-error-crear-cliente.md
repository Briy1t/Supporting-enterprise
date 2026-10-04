# Registro Técnico e Intervenciones de Backend — 02/09/2026

## I. Diagnóstico de Incidencias

### 1. Excepción de Clave en Creación de Cliente
* **Síntoma:** La función `crear_cliente()` interrumpe su ejecución lanzando un error de clave (*KeyError*) al intentar procesar el atributo `"correo"`.
* **Causa Raíz:** Tras corregir la ruta de carga del formulario, el controlador intenta acceder de forma directa a la clave de correo dentro de un objeto de tipo diccionario donde dicha propiedad no ha sido declarada ni transmitida.

### 2. Ausencia de Entidad Física en Motor de Base de Datos
* **Síntoma:** Al ejecutar operaciones de aprovisionamiento de usuarios, PostgreSQL rechaza las transacciones informando que la tabla `clientes` no existe en el esquema activo.
* **Causa Raíz:** Asimetría estructural en el motor de persistencia. El script de migración encargado de instanciar la entidad no ha sido consolidado en el servidor de base de datos.

### 3. Interrupción de Pipeline de Migración por Llave Foránea (Alembic)
* **Mensaje de Error en Consola:**
  ```text
  ForeignKeyViolation: la llave (lead_id)=(5) no está presente en la tabla «leads»
  ```
* **Causa Raíz:** Violación de integridad referencial. Existen registros remanentes en la tabla `contratos` que apuntan a un `lead_id = 5`; sin embargo, dicho *lead* fue eliminado físicamente del sistema con anterioridad. Al intentar aplicar el script de automatización, Alembic detiene la ejecución por inconsistencia, bloqueando la creación de las tablas subsecuentes (incluyendo la entidad `clientes`).

### 4. Estado de Conectividad Bidireccional
* **Diagnóstico:** El protocolo WebSocket permanece en estado pasivo en el módulo de administración. La plataforma mantiene su funcionalidad base, pero la sincronización de eventos e interfaces en tiempo real continúa catalogada como **pendiente de integración**.

---

## II. Acciones Correctivas y Plan de Saneamiento

Para reestablecer la coherencia del backend y permitir el despliegue de las nuevas estructuras, se define el siguiente protocolo de intervención imperativo:

### 1. Saneamiento de Integridad Referencial e Inserción de Tablas (Alembic)
* **Purga de Registros Huérfanos:** Identificar y eliminar de forma inmediata todas las filas en la tabla `contratos` que hagan referencia a identificadores de *leads* inexistentes en el sistema para sortear el bloqueo de la restricción `ForeignKeyViolation`.
* **Automatización de Esquemas:** Una vez limpia la persistencia, inicializar y ejecutar de forma secuencial los comandos de generación y actualización de esquemas:
  ```bash
  alembic revision --autogenerate -m "create clientes table"
  alembic upgrade head
  ```

### 2. Robustez en Modelos y Llaves Foráneas
* **Políticas de Eliminación:** Configurar explícitamente la directiva relacional `ondelete="CASCADE"` en las llaves foráneas correspondientes de los modelos para automatizar la remoción de dependencias y mitigar la futura aparición de datos huérfanos.

### 3. Refactorización Lógica de la Función `crear_cliente()`
* **Validación de Diccionarios:** Modificar la estructura del controlador para asegurar y verificar que el payload del formulario contenga la propiedad `correo` antes de intentar su lectura.
* **Flujo de Precondición Estricta:** Implementar una capa de validación previa que compruebe la existencia real del *lead* en la base de datos y verifique que posea un contrato asociado vigente antes de autorizar la inicialización formal del perfil de cliente.
