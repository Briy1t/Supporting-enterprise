## Incidencia — 28/08/2026 — Migración de contratos y servicios

### 1. Migración de nueva base de datos de contratos
* **Síntoma:** El framework FastAPI inició el entorno de ejecución aplicando una instrucción de `ROLLBACK`.
* **Causa Raíz:** Alembic ejecutó una migración que alteró las tablas `contratos` e `historial_contratos`. Debido a que esta migración no coincidía con la definición del modelo actual, SQLAlchemy revirtió la transacción automáticamente.
* **Impacto:** Los contratos no cargan en la interfaz, el historial permanece vacío, el archivo PDF no se vincula y los endpoints de este módulo fallan.

---

### 2. Servicios duplicados en la base de datos
* **Síntoma:** Los planes Básico, Profesional y Empresarial aparecen duplicados (dos veces cada uno) en el sistema.
* **Causa Raíz:** La tabla `servicios` se encuentra contaminada con registros obsoletos. Al añadir las columnas nuevas con Alembic, los planes se crearon por duplicado (antes y después del despliegue del CRUD).
* **Impacto:** El selector múltiple de la interfaz falla, la función de edición no responde, se muestran precios incorrectos y los contratos realizan cálculos de importes erróneos.

---

### 3. Edición de servicios no funciona
* **Síntoma:** El botón “Guardar” no actualiza las propiedades de título, descripción ni precio del servicio.
* **Causa Raíz:** La petición HTTP `PUT` no procesa los cambios debido a que el modelo de persistencia permanece inalterado durante la solicitud.
* **Impacto:** Los servicios no son editables, los nuevos contratos se emiten con datos obsoletos y el frontend continúa reflejando valores antiguos.

---

### 4. Selector múltiple de servicios no funciona
* **Síntoma:** La interfaz solo permite la selección de un único servicio a la vez.
* **Causa Raíz:** El componente del frontend no implementa la propiedad `multiple`, lo que impide que el backend reciba la lista correspondiente de identificadores (`IDs`). Adicionalmente, la presencia de registros duplicados rompe la lógica de selección.
* **Impacto:** Restricción en la usabilidad del formulario y fallos en la declaración de servicios por contrato.

---

### 5. PDF no se genera correctamente
* **Síntoma:** El motor de renderizado interrumpe su ejecución con la siguiente excepción de codificación:
  ```text
  UnicodeEncodeError: 'latin-1' codec can't encode character '\u2014'
  ```
* **Causa Raíz:** La librería FPDF no posee soporte nativo para codificar caracteres especiales como rayas (`—`), símbolos de moneda (`€`), eñes (`ñ`) o letras con tildes.
* **Impacto:** Falla la generación del archivo PDF, el contrato no se almacena en el sistema y el historial queda vacío.

---

### 6. PDF no se descarga
* **Síntoma:** Las solicitudes de descarga del documento contractual devuelven un código de estado HTTP `404 Not Found`.
* **Causa Raíz:** Discordancia en las rutas del sistema de archivos. El backend almacena el documento en el directorio `contratos_generados/`, pero el endpoint de descarga apunta e intenta buscar en `contratos/`.
* **Impacto:** Descarga imposible del archivo y el frontend muestra el mensaje descriptivo “No hay contrato generado”.

---

### 7. Campo archivo_pdf queda en NULL
* **Síntoma:** La columna `archivo_pdf` de la base de datos no almacena ningún valor físico.
* **Causa Raíz:** El backend omite la asignación de la ruta del archivo durante el flujo. Esto se ve agravado por la discrepancia entre la migración y el modelo, lo que provoca que el `ROLLBACK` de la base de datos elimine los cambios.
* **Impacto:** Historial de archivos vacío y bloqueos en las solicitudes de descarga de documentos.

---

### 8. CORS bloquea todas las peticiones
* **Síntoma:** Las peticiones del cliente son rechazadas por el navegador web con la siguiente traza de error:
  ```text
  Access to fetch at 'http://localhost:8001/servicios/' has been blocked by CORS policy
  ```
* **Causa Raíz:** El backend no envía el encabezado obligatorio `Access-Control-Allow-Origin`, impidiendo el intercambio seguro de recursos entre diferentes puertos locales.
* **Impacto:** Los contratos no cargan, los servicios no se listan en el catálogo, el selector queda inhabilitado y se bloquea la generación del PDF.
