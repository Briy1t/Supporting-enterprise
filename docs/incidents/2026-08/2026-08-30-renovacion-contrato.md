## Incidencias — 30/08/2026

### 1. Botón “Renovar contrato” no funciona
* **Síntoma:** Al ejecutar la acción, el sistema no efectúa la renovación del contrato ni genera la correspondiente entrada en el histórico.
* **Causa Raíz:** El endpoint encargado de la renovación omite la actualización del campo `fecha_fin`, la base de datos no registra la nueva fila en `historial_contratos` y el modelo de persistencia revierte los cambios sin salvar el estado.

---

### 2. Input “Subir contrato firmado” devuelve 404
* **Síntoma:** El control de carga de archivos de la interfaz no se renderiza en pantalla y el punto de acceso de la API devuelve un código de estado HTTP `404 Not Found`.
* **Causa Raíz:** Desalineación en el enrutamiento del backend. El endpoint fue declarado bajo una firma incorrecta o la carpeta física de destino para el almacenamiento de los archivos adjuntos no existe en el servidor.

---

### 3. Servicios contratados no se muestran correctamente
* **Síntoma:** La interfaz de usuario solo renderiza el identificador numérico (`ID`) del servicio sin desplegar su nombre o descripción comercial. Además, el formulario permite de forma errónea la selección de nuevas prestaciones durante el flujo de renovación.
* **Causa Raíz:** El backend devuelve una lista plana de llaves foráneas sin resolver ni expandir el objeto. Por su parte, el frontend no invoca al controlador correcto y carece de lógica condicional para bloquear la mutación de servicios en una renovación.

---

### 4. Datos corruptos en la base de datos
* **Síntoma:** El sistema bloquea los intentos de eliminación de registros de la tabla `clientes` y detiene la creación de nuevos contratos. El comportamiento anómalo solo afecta a registros heredados, mientras que las inserciones de clientes nuevos operan con normalidad.
* **Causa Raíz:** Integridad referencial comprometida. Migraciones previas asimétricas dejaron registros huérfanos y relaciones antiguas activas. Se detectó la presencia de valores `NULL` ilegibles en campos obligatorios de las entidades `contratos` y `clientes`.

---

### 5. Conflicto con campo “empresa”
* **Síntoma:** El formulario restringe el envío y exige obligatoriamente el nombre de la organización, incluso cuando el perfil del cliente corresponde al de una persona natural.
* **Causa Raíz:** Validación estricta y sobreconfigurada en el *schema* de Pydantic/Frontend. El modelo carece de la lógica condicional necesaria para parametrizar el atributo `empresa` como un valor opcional.

---

### 6. Necesidad de columna para clientes vencidos
* **Síntoma:** El personal administrativo no cuenta con un mecanismo ni indicador visual para filtrar o segmentar a los usuarios cuyos contratos comerciales han expirado.
* **Causa Raíz:** Omisión de atributos en el modelo de datos. La entidad carece de columnas de estado como `estado_cliente` o un booleano de verificación tipo `cliente_activa`.

---

### 7. Error en selección múltiple de servicios
* **Síntoma:** El componente de la interfaz no procesa selecciones conjuntas ni recupera el listado de las prestaciones vigentes del contrato.
* **Causa Raíz:** El frontend no implementa la propiedad nativa `multiple` en el elemento de selección, impidiendo el envío de arreglos hacia el backend. Asimismo, los datos corruptos remanentes en la base de datos quiebran la lógica de mapeo.

---

### 8. Error en envío de correo (Protocolo SMTP)
* **Síntoma:** El servicio de mensajería interrumpe su ejecución debido a rechazos de conexión por parte del servidor SMTP de Gmail.
* **Causa Raíz:** Restricciones estrictas de seguridad de Google que bloquean el inicio de sesión convencional e imponen el uso de contraseñas de aplicación (`email_password`). Al migrar temporalmente hacia la pasarela Mailtrap, el flujo se ve detenido por alcanzar los límites de la capa gratuita.

---

### 9. Error en envío de contrato finalizado
* **Síntoma:** El proceso de despacho electrónico del documento falla y la acción de renovación finalizada no dispara la notificación automatizada hacia el cliente.
* **Causa Raíz:** El endpoint específico para la gestión e integración del evento de notificación no se encuentra implementado o carece de la configuración del cliente SMTP en su controlador.
