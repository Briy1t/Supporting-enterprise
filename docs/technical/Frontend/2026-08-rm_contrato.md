# Frontend — 30/08/2026

## Diagnóstico de Componentes e Interfaces

### 1. Módulo de Renovación de Contrato
* **Fallo de comunicación:** El evento del botón de acción no invoca de manera correcta al endpoint correspondiente de la API.
* **Inercia de UI:** La interfaz no propaga las modificaciones ni refresca el estado visual del contrato tras el intento de procesamiento.
* **Omisión de renderizado:** El panel correspondiente no despliega el componente de registros históricos.

### 2. Carga de Documentación (Subir contrato firmado)
* **Fallo de interfaz:** El campo de entrada (*input*) de tipo archivo no se muestra en el árbol de componentes de la vista.
* **Error de enrutamiento:** Las solicitudes HTTP despachadas hacia el servidor son rechazadas con un código de estado `404 Not Found`.

### 3. Visualización de Servicios Contratados
* **Control incorrecto:** El selector múltiple implementa una lógica errónea en la captura y envío de datos.
* **Falta de resolución:** El componente renderiza únicamente los identificadores numéricos (`IDs`) primitivos de las entidades en lugar de los nombres comerciales de los servicios.
* **Violación de flujo operativo:** El formulario permite de forma incorrecta la selección y adición de nuevas prestaciones durante un proceso exclusivo de renovación.

---

## Nuevos Requerimientos Técnicos

### 1. Gestión Integral de Peticiones (Errores de Fetch)
Para mitigar fallos silenciosos en la aplicación y mejorar la robustez de las consultas asíncronas, se exige implementar el siguiente patrón de diseño:
* **Estructura de Control:** Envolver obligatoriamente todas las llamadas a la API utilizando bloques de control de excepciones `try/catch`.
* **Notificación al Usuario:** Capturar el código de error devuelto por el servidor y desplegar alertas o mensajes informativos explícitos en la interfaz gráfica para notificar el fallo operativo al usuario.

### 2. Optimización de Interfaz Limpia (Clean UI)
Se define una directiva de refactorización visual bajo los siguientes lineamientos:
* **Depuración de UI:** Eliminar por completo todas las etiquetas, campos redundantes y elementos gráficos que no aporten valor al flujo administrativo.
* **Rendimiento:** Optimizar los tiempos de carga y el ciclo de vida de los componentes mediante la eliminación de re-renderizados innecesarios.
* **Usabilidad (UX):** Simplificar la experiencia para mitigar la fatiga cognitiva y evitar cualquier escenario de confusión para el usuario operativo.
