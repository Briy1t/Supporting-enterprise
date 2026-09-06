## Incidencias — 05/09/2026

### 1. Error CORS al crear técnico
* **Síntoma:** El navegador web interrumpe la solicitud de alta bloqueando la transacción por políticas de seguridad de origen cruzado (CORS).
* **Causa Raíz:** El backend experimenta una excepción crítica interna antes de delegar la petición al enrutador. Debido a la arquitectura de FastAPI, si el flujo se interrumpe prematuramente por un error de importación o sintaxis, el middleware encargado de inyectar las cabeceras CORS nunca llega a ejecutarse, enmascarando el fallo real del servidor.

---

### 2. Colapso del Backend en Fase de Inicialización
* **Síntoma:** A pesar de que la terminal indica el despliegue del servidor de desarrollo mediante el comando:
  ```bash
  uvicorn main:app --reload --port 8001
  ```
  El backend no responde a ninguna solicitud HTTP entrante.
* **Causa Raíz:** Presencia de errores de importación circular y dependencias rotas introducidas en los nuevos módulos de rutas, sumado a un árbol de migraciones inconsistente que congela el hilo de ejecución principal de la aplicación.

---

### 3. Excepción del Constructor en FullCalendar (Incompatibilidad)
* **Mensaje de Error en Consola:**
  ```text
  Class constructor DayTimeColsView cannot be invoked without 'new'
  ```
* **Causa Raíz:** Conflicto de dependencias en la capa de UI. El proyecto fue actualizado a **React 19**, una versión que rompe la compatibilidad con el motor actual de la biblioteca FullCalendar, la cual solo ofrece soporte estable para las versiones 16, 17 y 18 del ecosistema de React.
* **Solución Aplicada:** Se procedió con la remoción de los paquetes incompatibles y el descenso controlado (*downgrade*) de las dependencias principales del frontend:
  ```bash
  npm uninstall @fullcalendar/react @fullcalendar/daygrid @fullcalendar/timegrid @fullcalendar/interaction
  npm install react@18 react-dom@18
  ```

---

### 4. Bloqueo Generalizado en el Calendario Técnico
* **Síntoma:** El módulo de agenda técnica se encuentra inoperable; la interfaz no carga los turnos laborales y falla al intentar agendar nuevas citas.
* **Causa Raíz:** Impacto compuesto. El fallo es el resultado directo de la caída del backend por errores de importación, las excepciones en los constructores de FullCalendar en el cliente y la ausencia de implementación de los endpoints en el servidor.

---

### 5. Interrupción del Pipeline de Migraciones (Alembic)
* **Síntoma:** Los scripts de migración diseñados para instanciar las entidades del módulo técnico no logran aplicarse en el motor de base de datos.
* **Causa Raíz:** Ruptura del historial cronológico. La alteración manual en la estructura de carpetas de Alembic, la omisión en la generación de archivos para los nuevos modelos ORM y la falta de un orden secuencial en las restricciones de llaves foráneas detienen el pipeline de actualización.

---

### 6. Fallo en la Persistencia de Disponibilidad y Citas
* **Síntoma:** El sistema descarta la creación de citas y bloquea el almacenamiento de los bloques de horarios disponibles de los técnicos.
* **Causa Raíz:** Deficiencia en el diseño del modelo. El esquema carece de una política de operaciones en cascada controlada entre las entidades `CitaTecnico` y `DisponibilidadTecnico`, impidiendo la propagación atómica de cambios desde los controladores de la capa de lógica de negocio.
