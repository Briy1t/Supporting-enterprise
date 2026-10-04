# Backend — 02/09/2026

## 1. Creación de Tabla Clientes con Alembic

### Diagnóstico y Preparación del Entorno
* **Detección de datos corruptos:** Realizar un escaneo de consistencia en las tablas `contratos` y `leads` para identificar discrepancias en las llaves primarias y foráneas.
* **Saneamiento previo:** Eliminar de forma obligatoria todos los registros huérfanos de la base de datos antes de realizar el despliegue del script de automatización.
* **Despliegue estructural:** Eliminar el histórico asimétrico, regenerar la migración correspondiente para la entidad `clientes` y aplicar la actualización en el servidor mediante el comando:
  ```bash
  alembic upgrade head
  ```

---

## 2. Gestión de ForeignKey y Datos Huérfanos

### Políticas de Integridad Referencial
* **Automatización de borrado:** Configurar de manera estricta la directiva relacional `ondelete="CASCADE"` en todas las declaraciones de llaves foráneas (`ForeignKey`) donde exista dependencia de ciclo de vida con entidades padre.
* **Purga de contratos:** Localizar y remover del almacenamiento persistente todos los contratos activos que apunten a identificadores de *leads* inexistentes o eliminados en el sistema.

---

## 3. Optimización de la Función `crear_cliente()`

### Validaciones y Reglas de Control en el Controlador
* **Integridad del Payload:** Asegurar y verificar mediante estructuras de control que el diccionario de datos proveniente del formulario contenga de forma explícita la clave y el valor del campo `correo`.
* **Capa de Precondición Estricta:** Implementar un flujo de validación previa que compruebe que el *lead* consultado existe en el sistema y posee un contrato asociado debidamente firmado antes de autorizar la creación e inicialización formal de la entidad Cliente.
