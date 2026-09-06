## Cambios en Rutas

* **Seguridad y Control de Tasa:** Integración de `limiter` en todas las rutas para mitigar abusos.
* **Sanitización de Datos:** Limpieza de texto con la librería `bleach` para prevenir vulnerabilidades.
* **Limpieza de Código:** Eliminación completa de rutas obsoletas.
* **Optimización:** Unificación de formularios en una sola API centralizada.
* **Nuevas Funcionalidades:** Integración de las rutas correspondientes a **Contratos**.

# Endpoints Requeridos

Definición de las rutas de la API necesarias para la gestión del catálogo de servicios y el ciclo de vida de los contratos.

## Módulo de Servicios

Este subconjunto de rutas maneja tanto la consulta pública del catálogo como la administración interna de las prestaciones.

| Método | Endpoint | Acceso | Descripción |
| :--- | :--- | :--- | :--- |
| **GET** | `/servicios/publico` | Público | Recupera el listado de servicios y precios disponibles para la web externa. |
| **GET** | `/servicios/` | Interno | Lista todos los servicios con metadatos específicos para la plataforma de administración. |
| **POST** | `/servicios/` | Interno | Registra un nuevo servicio o plan dentro del catálogo global. |
| **PUT** | `/servicios/{id}` | Interno | Modifica las propiedades, precios o descripciones de un servicio existente mediante su ID. |
| **DELETE** | `/servicios/{id}` | Interno | Remueve de forma lógica o física un servicio del catálogo. |

---

## Módulo de Contratos

Rutas transaccionales encargadas del procesamiento, generación de documentos y flujo de firmas.

| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| **POST** | `/contratos/generar` | Procesa las variables seleccionadas, calcula los totales y genera el PDF corporativo. |
| **POST** | `/contratos/enviar` | Despacha el documento generado por correo electrónico al lead o correo alternativo. |
| **POST** | `/contratos/subir-firmado` | Recibe el archivo digitalizado del contrato firmado por el cliente para activar su cuenta. |
| **GET** | `/contratos/historial/{lead_id}` | Consulta de manera cronológica todos los contratos asociados a un identificador de lead. |
