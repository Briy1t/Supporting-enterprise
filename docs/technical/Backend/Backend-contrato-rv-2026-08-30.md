# Diagnóstico Técnico y Plan de Saneamiento Base

Este documento consolida las fallas críticas de lógica y de persistencia detectadas en el sistema, junto con la estrategia obligatoria para restablecer la integridad de la base de datos.

---

## Diagnóstico de Componentes

### 1. Renovación de Contrato
* **Fallo de persistencia:** El punto de acceso (*endpoint*) no propaga las modificaciones ni actualiza los estados en el modelo ORM.
* **Omisión de auditoría:** El sistema no genera la fila correspondiente en la tabla de historial.
* **Inercia temporal:** El campo `fecha_fin` permanece inalterado, impidiendo la extensión de la vigencia.
* **Desactualización documental:** El atributo `archivo_pdf` no se sobrescribe ni se actualiza con la ruta del nuevo documento de renovación.

### 2. Subida de Contrato Firmado
* **Enrutamiento inválido:** El controlador de la API está registrado bajo una ruta incorrecta o inexistente.
* **Ausencia de infraestructura física:** El directorio de destino asignado para el almacenamiento de los archivos adjuntos no existe en el sistema de archivos del servidor.
* **Definición asimétrica:** La lógica de backend construye de manera errónea las rutas de acceso relativas.

### 3. Servicios Contratados
* **Mapeo incompleto:** El backend transmite únicamente los identificadores numéricos (`IDs`) primitivos de las entidades.
* **Falta de expansión:** El servidor omite la resolución de las llaves foráneas, impidiendo el despliegue del nombre y los detalles de los servicios en el cliente.
* **Quiebre de regla de negocio:** La interfaz presenta una lógica incorrecta que habilita la selección de nuevas prestaciones durante un proceso exclusivo de renovación.

### 4. Corrupción de Datos Remanentes
* **Inconsistencia de esquemas:** Las migraciones asíncronas previas dejaron registros huérfanos y relaciones comprometidas en la base de datos.
* **Bloqueo de operaciones de borrado:** El sistema impide la eliminación física o lógica de los registros de contratos antiguos debido a restricciones de integridad referencial.
* **Bloqueo de mutación:** Los registros antiguos de la tabla `clientes` no admiten modificaciones ni actualizaciones de ningún tipo.

---

## Solución Integral y Saneamiento de Base de Datos

Para solucionar de manera definitiva la corrupción de los registros y asegurar la consistencia con las nuevas propiedades, se debe ejecutar un procedimiento de despliegue limpio (*Clean Deployment*).

### Protocolo de Ejecución de Schemas y Persistencia
1. **Purgado total:** Proceder con la eliminación física de todas las tablas actuales en el motor de la base de datos.
2. **Eliminación de histórico de control:** Borrar por completo el directorio de versiones heredado de Alembic para suprimir las migraciones inconsistentes.
3. **Inicialización de entorno:** Recrear la base de datos desde cero en el servidor.
4. **Generación de esquema limpio:** Ejecutar un nuevo comando de inicialización de Alembic para compilar las migraciones nativas directamente desde las definiciones actuales de los modelos de SQLAlchemy.
5. **Migración de estructuras:** Ejecutar la migración limpia para consolidar los esquemas y las nuevas restricciones de integridad en el entorno de desarrollo.
