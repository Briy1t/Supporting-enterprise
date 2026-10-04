# Ajustes de Arquitectura y Saneamiento del Backend

Este documento detalla las fallas en la lógica de filtrado de la API, las correcciones en el tipo de datos para el catálogo y el protocolo de integridad referencial aplicado en la base de datos.

---

## 1. Corrección de Filtros en Consultas (ORM)

### Fallo en el Filtrado de Contratos
* **Diagnóstico:** Las funciones encargadas de recuperar la información contractual ejecutaban una instrucción `.first()` de forma global en la consulta de SQLAlchemy, omitiendo la cláusula de restricción por el identificador del lead (`lead_id`).
* **Impacto:** El endpoint de consulta del historial devolvía indiscriminadamente la totalidad de los contratos registrados en la plataforma en lugar de aislar los registros correspondientes a la entidad consultada.
* **Resolución:** Implementar de forma obligatoria la directiva `.filter_by(lead_id=lead_id)` antes de realizar la resolución de cualquier registro o colección en el ORM.

---

## 2. Reestructuración de Servicios Contratados

### Normalización del Tipo de Datos
Para solucionar los conflictos de vinculación en el frontend, se exige el cambio de persistencia de cadenas de texto a identificadores numéricos:
* **Persistencia:** Almacenar única y exclusivamente arreglos de identificadores únicos (`IDs`) numéricos en la entidad correspondiente.
* **Salida de la API:** Modificar los esquemas de respuesta para que el servidor devuelva los `IDs` originales.
* **Expansión Dinámica:** Desarrollar la lógica de resolución en el endpoint para expandir las llaves foráneas y adjuntar los nombres y metadatos comerciales de los servicios solo cuando la interfaz lo requiera.

---

## 3. Saneamiento contra Datos Corruptos

### Protocolo de Integridad de Base de Datos
Con el fin de remover los registros huérfanos y la contaminación estructural de las tablas, se ejecutaron las siguientes acciones:
* **Depuración de migraciones:** Limpieza manual y ordenamiento del histórico de versiones en los scripts de Alembic.
* **Depuración física:** Remoción manual de registros corruptos utilizando la interfaz de DB Browser.
* **Recreación de tablas:** Regeneración completa y despliegue limpio de los esquemas en el motor de la base de datos.

### Implementación de Eliminación en Cascada
Para prevenir futuros escenarios de datos huérfanos o registros huérfanos que corrompan el sistema, se actualizó la definición de los modelos agregando la siguiente restricción relacional:
```python
# Directiva obligatoria en la definición de la Llave Foránea
ForeignKey("tabla.id", ondelete="CASCADE")
```

---

## 4. Lógica de Negocio y Control de Duplicados

### Regla Estricta de Restricción de Entradas
* **Mecanismo de Bloqueo:** El backend debe rechazar y bloquear el registro de cualquier nuevo *lead* que intente ingresar utilizando una dirección de correo electrónico o número telefónico que ya se encuentre dado de alta en la base de datos.
* **Condición de Estado:** Esta validación es mandatoria y aplica de forma estricta para todos los registros que permanezcan bajo el estado de `pendiente`.

---

## 5. Estado del Protocolo en Tiempo Real

### Omisión de Canal WebSocket
* **Diagnóstico:** El frontend experimenta fallos de conectividad debido a que la ruta de red `/admin/forms/ws` no se encuentra declarada ni mapeada en el servidor. El protocolo de comunicación bidireccional mediante WebSocket se declara formalmente como **no implementado** en la versión actual de la API.
