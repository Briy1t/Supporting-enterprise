## Gestión de Contratos

### APIs creadas
* `Creación de contrato`
* `Historial de contratos`

### Ajustes realizados
* **Diseño y UI:** Centrado de títulos y subtítulos para mejorar la lectura.
* **Backend y Dependencias:** Integración de `python-multipart`.
* **Base de Datos:**
  * Corrección de relaciones en la base de datos.
  * Eliminación de tablas obsoletas.
  * Restauración de tablas con nuevos campos.

---

# Módulo de Gestión de Contratos

Este documento detalla el ciclo de vida, la estructura de archivos y las reglas de negocio críticas para la emisión y validación de contratos dentro del sistema.

## Flujo Completo del Proceso

El flujo de trabajo interactivo entre el usuario operativo, el cliente y el sistema se ejecuta de la siguiente manera:

1. **Apertura de la interfaz:** El administrativo accede a la página de gestión de contratos.
2. **Carga de datos:** Los datos del *lead* correspondiente se cargan de forma automática en el formulario.
3. **Selección de prestaciones:** El usuario selecciona los servicios mediante casillas de verificación (*checkbox*).
4. **Parámetros temporales:** Se define la duración del contrato a través de un menú desplegable (*select*).
5. **Automatización legal:** Las políticas y condiciones legales se rellenan automáticamente según las variables previas.
6. **Datos opcionales:** El administrativo puede ingresar un correo electrónico alternativo y el nombre de la empresa si aplica.
7. **Procesamiento en Backend:**
   ```text
   Backend crea el contrato ➔ Genera PDF corporativo ➔ Almacena el archivo ➔ Envía por correo electrónico
   ```
8. **Actualización en Frontend:** La interfaz actualiza los componentes de "Contrato actual" e "Historial" en tiempo real para reflejar el estado actual.

---

## Estructura de Componentes del Módulo

Los archivos del frontend encargados de renderizar y controlar este flujo se encuentran organizados en el siguiente directorio:

```text
src/pages/Contratos/
    ├── Contratos.jsx
    ├── ContratoForm.jsx
    ├── ContratoCard.jsx
    └── ModalConfirmacion.jsx
```

---

## Validaciones Críticas y Reglas de Negocio

Para asegurar la integridad de la base de datos y evitar inconsistencias legales, se deben respetar de forma estricta las siguientes reglas:

* **Mecanismo de Doble Confirmación:** Implementación obligatoria de ventanas de confirmación explícita para todas las acciones operativas delicadas.
* **Restricción de Estado Finito:** Está estrictamente prohibido asignar un `cliente_id` a la entidad hasta que se reciba el contrato firmado en el sistema.
* **Control de Carga:** El sistema cuenta con un *checkbox* explícito para marcar como "Contrato firmado subido".
* **Activación de Credenciales:** Solo tras la validación del paso anterior se procede con la creación formal de la entidad Cliente y la generación automática de sus credenciales de acceso.