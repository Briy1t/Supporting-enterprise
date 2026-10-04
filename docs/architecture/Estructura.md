# Estructura Técnica del Proyecto Supporting Enterprise

# 1. Objetivo del documento

Este documento describe la estructura técnica del proyecto Supporting Enterprise, incluyendo la organización del frontend (React + Vite) y del backend (FastAPI). Su propósito es proporcionar una visión clara y profesional de cómo está distribuido el código y cómo se relacionan los módulos entre sí.

---

## 2. Estructura del Frontend (React + Vite)

El frontend está desarrollado en **React**, utilizando **Vite** como herramienta de construcción.  
El proyecto trabaja en **JavaScript**, tras eliminar los archivos `.tsx` y la configuración TypeScript.

```
supporting-enterprise-frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── img/
│   │   └── css/
│   │
│   ├── components/
│   │   ├── layout/        # Sidebar, Header, estructura visual
│   │   ├── ui/            # Botones, inputs, elementos reutilizables
│   │   └── shared/        # Componentes comunes entre páginas
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── pages/
│   │   ├── Index/
│   │   │   └── Index.jsx
│   │   │
│   │   ├── Clientes/
│   │   │   ├── Clientes.jsx
│   │   │   ├── Expediente.jsx
│   │   │   └── ServiciosCliente.jsx
│   │   │
│   │   ├── Tecnicos/
│   │   │   ├── Tecnicos.jsx
│   │   │   ├── Disponibilidad.jsx
│   │   │   └── Agenda.jsx
│   │   │
│   │   ├── Servicios/
│   │   │   └── Servicios.jsx
│   │   │
│   │   ├── Alertas/
│   │   │   └── Alertas.jsx
│   │   │
│   │   └── Administracion/
│   │       ├── Administracion.jsx
│   │       └── ClientesInteresados.jsx
│   │
│   ├── router/
│   │   └── AppRouter.jsx
│   │
│   ├── services/
│   │   ├── clientesService.js
│   │   ├── tecnicosService.js
│   │   ├── serviciosService.js
│   │   ├── alertasService.js
│   │   └── adminService.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json


---

## 2. Correcciones realizadas en el frontend

### 2.1 Eliminación de archivos `.tsx`

El proyecto se creó inicialmente con soporte **TypeScript**, lo que provocaba errores al ejecutar React.  
Se eliminaron:

- `App.tsx`
- `main.tsx`

Y se reemplazaron por:

- `App.jsx`
- `main.jsx`

---

### 2.2 Cambio en el HTML principal

El archivo `index.html` contenía:

```html
<script type="module" src="/src/main.tsx"></script>
Se corrigió a:

html
<script type="module" src="/src/main.jsx"></script>

### 2.3 Cambio de configuración de Vite
Se renombró:

```
vite.config.ts → vite.config.js

```

Contenido actualizado:

```
js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
}); ```


## 3. Estructura del Backend (FastAPI)
El backend está desarrollado con FastAPI, organizado en módulos independientes para mantener claridad, escalabilidad y buenas prácticas. La estructura del proyecto permite separar la lógica de negocio, los modelos, los esquemas de validación y los endpoints de la API.


```Código

supporting-enterprise-backend/
│
├── app/
│   ├── routes/        # Endpoints de la API
│   │   ├── clientes.py
│   │   ├── tecnicos.py
│   │   ├── servicios.py
│   │   ├── alertas.py
│   │   ├── tickets.py
│   │   └── admin.py
│   │
│   ├── controllers/   # Lógica de negocio
│   ├── models/        # Modelos de base de datos
│   ├── schemas/       # Validación con Pydantic
│   ├── utils/         # Funciones auxiliares
│   └── main.py        # Punto principal de la API
│
├── run.py             # Script de ejecución recomendado
└── requirements.txt

```

### 3.1 Ventajas de usar run.py
El archivo run.py permite ejecutar el backend de forma más flexible:

```bash
python run.py
```

Beneficios:

Cambiar host/puerto sin tocar main.py

Añadir logs, monitorización o procesos previos al arranque

Integración con supervisores (systemd, pm2, supervisor)

Mantener main.py limpio y profesional

Facilitar despliegues en AWS EC2

## 4. Relación entre frontend y backend
El frontend consume la API del backend mediante los servicios ubicados en /src/services/.

Cada área del negocio (clientes, técnicos, servicios, alertas, administración) tiene su propio módulo tanto en frontend como en backend.

La arquitectura está diseñada para permitir escalabilidad y separación de responsabilidades.

## 5. Conclusión
La estructura técnica del proyecto Supporting Enterprise está organizada de forma modular y profesional, siguiendo buenas prácticas de desarrollo y DevOps. Esta organización facilita el mantenimiento, la escalabilidad y la integración futura con sistemas de monitorización, automatización y despliegue continuo.