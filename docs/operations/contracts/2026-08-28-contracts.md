# Gestión de Contratos — 28/08/2026

## Problemas Detectados

Durante las pruebas operativas del módulo de contratos, se identificaron las siguientes inconsistencias en la lógica y comportamiento del sistema:

* **Restricción en selección:** La interfaz actual solo permite seleccionar un único servicio por petición.
* **Redundancia de interfaz:** Las políticas opcionales se despliegan en el formulario a pesar de que ya vienen preconfiguradas de forma predeterminada.
* **Fallo en persistencia del documento:** El archivo contractual se genera en el almacenamiento físico, pero no está disponible para su descarga.
* **Inconsistencia de estado:** El contrato generado no se ve reflejado en el panel del frontend.
* **Omisión de ruta:** El campo `archivo_pdf` en la base de datos almacena un valor equivalente a `NULL`.
* **Rutas desacopladas:** El controlador encargado de servir la descarga apunta a un directorio incorrecto.

---

## Discrepancias Técnicas de Integración

### 1. Enrutamiento del Archivo PDF
Existe una inconsistencia entre el directorio de escritura del documento y el punto de acceso para su lectura:
* **Ruta de almacenamiento real:** 
  ```text
  contratos_generados/contrato_{id}.pdf
  ```
* **Ruta de consulta en el endpoint:** 
  ```text
  contratos/{cliente_id}.pdf
  ```

### 2. Contrato de Datos del Lead
Falta de alineación en las firmas de los parámetros de comunicación entre capas:
* **Parámetro despachado por el Frontend:** `lead_id`
* **Parámetro esperado por el Backend:** `cliente_id`

---

## Mejoras Necesarias

Para estabilizar el módulo y asegurar su escalabilidad, se requiere planificar e implementar los siguientes cambios:

* **Persistencia de rutas:** Almacenar de manera estricta la ruta física del PDF en la base de datos tras su generación exitosa.
* **Habilitación multiprestación:** Modificar el formulario y el esquema de validación para permitir la selección múltiple de servicios.
* **Depuración de UI:** Eliminar el campo redundante de políticas opcionales en la interfaz de usuario.
* **Rediseño de documento:** Reestructurar visualmente la plantilla del contrato en PDF.
* **Identidad de marca:** Incorporar el logotipo corporativo de la empresa en el encabezado del documento.
* **Validación formal:** Integrar una sección dedicada para la recopilación de firmas de conformidad.
* **Internacionalización:** Migrar hacia una librería de generación de PDF profesional que ofrezca soporte nativo para codificación UTF-8.
