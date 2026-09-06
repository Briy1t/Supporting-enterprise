# Actualizaciones en la Plataforma

## Nuevos campos integrados en models y schemas
* **teléfono**
* **privacidad**
* **fecha_aceptacion**
* **ip_usuario**
* **estado**

---

## Acciones del administrativo
El administrativo necesita visualizar:
* **teléfono**
* **si ya llamó**
* **si está esperando respuesta**
* **si el cliente aceptó**
* **si el cliente rechazó**

---

## Estados comerciales

| Estado | Significado |
| :--- | :--- |
| **pendiente** | Formulario recién llegado |
| **llamado** | El administrativo llamó |
| **esperando_respuesta** | El cliente pidió tiempo |
| **aceptado** | El cliente aceptó |
| **convertido** | Ya es cliente |
| **descartado** | No procede |

---

## Cambios en frontend
* Columna **“Teléfono”**
* Columna **“Estado”**
* Botón **“Marcar como llamado”**
* Botón **“Esperando respuesta”**
* Botón **“Aceptar y convertir”**
* Botón **“Descartar”**
* Botón **“Volver al panel”**
