## Incidencias — 31/08/2026

### 1. Cliente #12 no tiene contrato asociado
* **Síntoma:** Al consultar el endpoint `/contratos/historial/12`, el servidor devuelve un cuerpo de respuesta completamente vacío.
* **Causa Raíz:** La entidad con el identificador `#12` carece por completo de un registro inicial indexado en la tabla `contratos`.
* **Impacto:** El componente `CrearCliente.jsx` recibe una referencia `contrato_id = null`, lo que impide la carga de las prestaciones y bloquea el flujo de creación del perfil del cliente.

---

### 2. Datos corruptos en tabla servicios
* **Acción Correctiva:** Se implementó el parámetro `default=[]` dentro del modelo `Servicio` y se procedió con una depuración estructural manual manipulando el archivo de migración de Alembic y el gestor DB Browser.
* **Impacto:** Se eliminaron con éxito las inserciones de servicios duplicados y se saneó la integridad referencial de los registros huérfanos.

---

### 3. Enviar contrato usa modal incorrecto
* **Síntoma:** Al accionar la directiva de envío de contratos, la interfaz del navegador despliega una ventana de alerta nativa (`alert()`) en lugar de renderizar la ventana modular del sistema.
* **Causa Raíz:** El controlador de eventos del módulo invoca a una función de alerta obsoleta en lugar de llamar al componente centralizado localizado en `/components/ModalConfirmacion.jsx`.

---

### 4. Contrato generado pertenece a otro cliente
* **Síntoma:** El documento contractual perteneciente a un usuario específico se renderiza de forma errónea dentro del perfil de visualización de otro cliente.
* **Causa Raíz:** Error en la consulta del ORM. La función encargada de compilar los datos para la generación del PDF ejecuta una instrucción `.first()` de forma global sin aplicar la cláusula de filtrado por `lead_id`.
* **Impacto:** Cruzamiento de información confidencial, almacenamiento erróneo en el historial y desestructuración del panel de administración.

---

### 5. Historial muestra TODOS los contratos
* **Síntoma:** El componente de historial de un cliente despliega de manera indiscriminada la totalidad de los contratos de la plataforma.
* **Causa Raíz:** El endpoint de consulta carece de la lógica de restricción por el identificador del lead, por lo que la sentencia SQL recupera el conjunto completo de registros de la tabla.

---

### 6. Duplicación de acciones en historial
* **Síntoma:** La bitácora del historial de interacciones muestra líneas de eventos de acción repetidas de forma consecutiva.
* **Causa Raíz:** El backend persiste eventos duplicados durante las transacciones y la interfaz de usuario del frontend renderiza el arreglo completo de la respuesta de la API sin aplicar filtros de unicidad.

---

### 7. Servicios devueltos como texto en vez de IDs
* **Síntoma:** El backend transmite el campo de las prestaciones en un formato serializado de cadenas de texto (ej. `servicios: ["monitoreo"]`) en lugar del arreglo de enteros correspondiente (ej. `servicios: [1]`).
* **Impacto:** La aplicación en React es incapaz de mapear o encontrar coincidencias lógicas, provocando que el componente `CrearCliente.jsx` indique de forma persistente "Servicios coincidentes: 0".

---

### 8. Cliente convertido sigue apareciendo en “Aceptados”
* **Síntoma:** Tras finalizar con éxito la transición de un usuario, el registro permanece estancado en la columna de leads "Aceptados" dentro del pipeline.
* **Causa Raíz:** La tabla `Lead` mantiene el estado original activo debido a que no recibe la instrucción de actualización de su columna de estado comercial, evidenciando además la redundancia innecesaria de poseer una tabla aislada para registros finalizados.

---

### 9. Plataforma no se actualiza automáticamente
* **Síntoma:** El personal operativo se ve obligado a refrescar manualmente el navegador web para visualizar los cambios de estado en el panel de administración.
* **Causa Raíz:** Ausencia del protocolo de comunicación bidireccional en tiempo real debido a que el canal WebSocket no ha sido implementado en la API del servidor.

---

### 10. Error al convertir cliente desde Kanban
* **Síntoma:** El sistema interrumpe la acción en el tablero Kanban devolviendo la siguiente excepción: "Ya existe una solicitud pendiente con este correo o teléfono".
* **Causa Raíz:** El tablero Kanban invoca de forma directa a la API transaccional de conversión en lugar de redirigir el flujo hacia la ruta parametrizada `/crear-cliente?lead_id=...`. Al hacerlo, el backend intercepta los datos y detecta una colisión por duplicidad en la tabla `Lead`.

---

### 11. Error 500 por teléfono vacío
* **Síntoma:** El panel de administración web no carga y se congela al intentar recuperar los datos de los leads.
* **Causa Raíz:** Error de validación de respuesta (*Response Validation Error*). Los registros heredados en la base de datos poseen el campo `telefono = ""`, pero el esquema de salida de FastAPI (`Pydantic`) implementa una restricción de longitud mínima estricta (`min_length=8`).
* **Impacto:** El servidor FastAPI rompe el flujo arrojando una excepción interna de código `500` y el cliente frontend experimenta un fallo general de red.

---

### 12. Pérdida de archivos por no hacer commit
* **Síntoma:** El código fuente actualizado correspondiente a las últimas modificaciones del módulo de administración desapareció del entorno local de desarrollo.
* **Causa Raíz:** Omisión en el flujo de control de versiones. No se realizaron los *commits* de Git requeridos para asegurar el trabajo antes de aplicar operaciones de sincronización que terminaron sobrescribiendo los archivos locales.

---

### 13. Teléfono no aparece en frontend
* **Causa Raíz:** El atributo `telefono` fue omitido involuntariamente dentro de la definición de la clase del esquema de respuesta `LeadResponse`. Al no estar mapeado, FastAPI purga el campo antes de serializar el JSON de salida.

---

### 14. Error 404 en WebSocket
* **Síntoma:** La consola de desarrollo del navegador web reporta de manera recurrente el siguiente fallo de conexión:
  ```text
  Unexpected response code: 404
  ```
* **Causa Raíz:** El frontend intenta abrir un canal persistente apuntando a la ruta `/admin/forms/ws`, la cual no se encuentra declarada ni implementada en los enrutadores del servidor backend.

---

### 15. Error 422 al enviar correo
* **Síntoma:** El componente modal de la interfaz muestra un carácter de interrogación `"?"` y el backend rechaza la solicitud devolviendo un código de estado de validación HTTP `422 Unprocessable Entity`.
* **Causa Raíz:** La petición asíncrona `GET /admin/forms/{id}` falla devolviendo un error `404`, provocando que React inicialice el estado del correo como una cadena vacía `""`. Posteriormente, el backend de FastAPI rechaza la transacción por no cumplir con la máscara de email válida.

---

### 16. Servicios no se vinculan al crear cliente
* **Síntoma:** El módulo de aprovisionamiento `CrearCliente.jsx` reporta la siguiente salida: "Servicios coincidentes encontrados: 0".
* **Causa Raíz:** Discordancia de tipos de datos en el flujo de datos. El servidor persiste las prestaciones utilizando colecciones de texto plano, mientras que la interfaz de React ejecuta comparaciones lógicas esperando una estructura basada en arreglos de identificadores numéricos (`IDs`).
