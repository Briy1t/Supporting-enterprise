## Cambios en Modelos

Esta sección detalla las modificaciones y reestructuraciones aplicadas a las entidades de la base de datos para alinearlas con la nueva lógica del catálogo de servicios y la gestión de contratos.

### 1. Servicio
El modelo se rediseña para funcionar de forma desacoplada como un catálogo global:
* **Eliminación de relaciones:** Se remueve por completo la relación directa con la entidad `Cliente`.
* **Persistencia como catálogo:** Mantiene su naturaleza de entidad de solo consulta o asignación indirecta.
* **Añadir campo `precio`:** Incorporación del atributo para definir el costo unitario de la prestación.
* **Añadir campo `descripción`:** Espacio para almacenar el detalle comercial o técnico del servicio.
* **Añadir campo `categoría` (Opcional):** Clasificador para agrupar o segmentar los servicios en el sistema.

### 2. Contrato
Se expande la entidad para soportar la centralización de datos y el flujo automatizado:
* **Añadir lista de servicios por ID:** Mapeo estructurado para vincular múltiples servicios utilizando únicamente sus identificadores únicos.
* **Añadir campo `precio_total`:** Atributo calculado para almacenar la sumatoria económica del documento.
* **Añadir campo `correo_alternativo`:** Campo opcional de contacto para el envío de notificaciones y copias digitales.
* **Añadir campo `nombre_empresa`:** Atributo de texto para el registro de la persona jurídica o razón social.
* **Añadir campo `archivo_pdf`:** Almacenamiento de la ruta o referencia binaria del documento corporativo generado.
* **Añadir relación `historial_de_contratos`:** Enlace para consultar el registro cronológico de transacciones previas.

### 3. Lead
Correcciones y acoplamiento con el nuevo flujo comercial:
* **Corrección de importación:** Ajuste en las referencias de los módulos `main` y `database` para evitar errores de carga circular.
* **Actualización de jerarquía:** Configuración correcta de la relación relacional que vincula directamente a `Lead` con la entidad `Contrato`.
