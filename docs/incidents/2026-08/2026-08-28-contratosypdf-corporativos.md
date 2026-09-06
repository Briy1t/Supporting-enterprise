## Incidencias Adicionales de Gestión de Contratos y PDF

### 1. Contrato se genera pero no aparece en frontend
* **Síntoma:** La interfaz de usuario muestra de manera persistente el mensaje descriptivo “No hay contrato generado”.
* **Causa Raíz:** El archivo binario del PDF sí llega a crearse físicamente en el servidor; sin embargo, el backend almacena la columna `archivo_pdf` con valor `NULL`. Debido a esto, el endpoint de descarga no puede resolver la ruta de acceso.
* **Impacto:** Inposibilidad de consultar, recuperar o interactuar con el documento desde el panel administrativo.

---

### 2. PDF corporativo necesita rediseño
* **Síntoma:** El documento de contrato resultante presenta un aspecto visual deficiente, plano y carente de identidad corporativa (sin logotipos ni maquetación estructurada).
* **Causa Raíz:** Limitaciones técnicas del motor FPDF básico, el cual no cuenta con capacidades nativas para procesar directivas de diseño complejo ni estilos avanzados.
* **Impacto:** Imagen poco profesional del sistema y una presentación deficiente de la documentación hacia los clientes finales.

---

### 3. Necesidad de migrar a librería PDF profesional
* **Motivación Técnica y Comercial:** El flujo operativo exige la adopción de una biblioteca de renderizado avanzada para dar soporte a los siguientes requerimientos del negocio:
  * Codificación nativa de caracteres UTF-8 (para prevenir excepciones por eñes y tildes).
  * Inyección dinámica de logotipos e imagotipos de la empresa.
  * Renderizado e indexación de tablas de datos complejas.
  * Secciones dedicadas para la integración de firmas digitales o manuscritas.
  * Aplicación estricta de la paleta de colores corporativos.
  * Maquetación estructural apta para reportes empresariales.

---

### 4. Error FileNotFoundError
* **Síntoma:** El servidor interrumpe la transacción del documento arrojando la siguiente excepción del sistema operativo:
  ```text
  FileNotFoundError: contratos_generados\contrato_64.pdf
  ```
* **Causa Raíz:** El directorio de destino `contratos_generados/` no ha sido creado previamente en el entorno del servidor, o bien la lógica del backend está construyendo la ruta relativa utilizando separadores de sistema no normalizados.

---

### 5. Contrato no carga datos del lead
* **Causa Raíz:** Discrepancia y falta de acoplamiento en la firma de los contratos de la API. El frontend despacha en la petición el parámetro `lead_id`, mientras que el controlador del backend queda a la espera de recibir el atributo `cliente_id`.
* **Impacto:** El contrato se genera completamente vacío, el archivo PDF omite la información del titular y el pipeline del servidor falla debido a un error de validación y serialización de datos.
