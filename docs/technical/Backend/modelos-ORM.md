# Backend — Módulo de Técnicos — 03/09/2026

Este documento detalla la especificación de los modelos relacionales, la matriz de mapeo del ORM y la definición de controladores y rutas requeridas para dar soporte al Panel Técnico en el servidor.

---

## 1. Modelos ORM Requeridos (SQLAlchemy)

Para garantizar la correcta persistencia de las operaciones de soporte y telemetría, se deben instanciar y mapear las siguientes entidades en la base de datos:

* **`Tecnico`:** Entidad principal que almacena el perfil del operario y hereda la relación de autenticación con la tabla centralizada de usuarios.
* **`Ticket`:** Registro transaccional de incidencias o requerimientos levantados por los clientes.
* **`Alerta`:** Ingesta de anomalías de infraestructura despachadas por el microservicio externo.
* **`EventoCalendario`:** Bloque temporal indexado para la gestión de citas, visitas técnicas y turnos laborales.
* **`Cliente`:** Modificación de la entidad existente para admitir la columna de asignación del técnico responsable del soporte.

---

## 2. Definición de Relaciones Relacionales (Matriz ORM)

Las entidades deben acoplarse mediante restricciones de llaves foráneas (`ForeignKey`) e instrucciones de relación bidireccional (`relationship`) bajo el siguiente esquema:

* **Técnico ↔ Ticket:** Relación de uno a muchos (`1:N`). Un técnico administra múltiples tickets; un ticket se asigna a un único técnico responsable.
* **Técnico ↔ Alerta:** Relación de uno a muchos (`1:N`). Un técnico recibe y procesa una colección de alertas críticas de infraestructura.
* **Técnico ↔ EventoCalendario:** Relación de uno a muchos (`1:N`). Un técnico posee una agenda única compuesta por múltiples bloques temporales de citas.
* **Técnico ↔ Cliente:** Relación de uno a muchos (`1:N`). Un técnico es asignado de forma fija o temporal para dar soporte a una cartera exclusiva de múltiples clientes.

---

## 3. Controladores del Servidor (Capa de Lógica de Negocio)

Funciones encargadas de interactuar con la base de datos, aplicar filtros por el identificador del operario y empaquetar las colecciones de datos:

* **`get_tickets_tecnico`:** Recupera y filtra los tickets asignados al operario según su estado (ej. pendientes, en proceso, resueltos).
* **`get_alertas_tecnico`:** Obtiene el listado cronológico de incidentes de infraestructura vinculados al técnico.
* **`get_calendario_tecnico`:** Compila las citas y bloques de disponibilidad del operario filtrados por rangos de fechas.
* **`get_clientes_tecnico`:** Lista la cartera de clientes bajo la responsabilidad directa del técnico para consultas de perfil 360.

---

## 4. Enrutadores y Puntos de Acceso (Matriz de Endpoints)

Rutas HTTP expuestas de forma privada y protegidas mediante el middleware de verificación de tokens (`JWT`) y validación de rol de técnico:

| Método | Endpoint | Controlador Asociado | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/tecnicos/{id}/tickets` | `get_tickets_tecnico` | Retorna el listado de incidencias asignadas al identificador del técnico. |
| **GET** | `/tecnicos/{id}/alertas` | `get_alertas_tecnico` | Devuelve el flujo de alertas de infraestructura del operario. |
| **GET** | `/tecnicos/{id}/calendario` | `get_calendario_tecnico` | Sirve la agenda y cronograma de citas del técnico especificado. |
| **GET** | `/tecnicos/{id}/clientes` | `get_clientes_tecnico` | Compila los datos de los clientes vinculados al operario para soporte. |
