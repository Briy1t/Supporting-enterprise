# INCIDENT LOG — Error de carga del frontend (React + Vite)

## Fecha
29/07/2026

## Descripción del incidente
El frontend no cargaba correctamente debido a que el proyecto se creó con soporte TypeScript, generando archivos `.tsx` que no eran compatibles con la configuración actual del proyecto.

## Síntomas
- La aplicación no iniciaba.
- Vite mostraba errores de compilación.
- El navegador no renderizaba el contenido.
- El archivo `index.html` apuntaba a `main.tsx`, que ya no existía.

## Causa raíz
- Proyecto inicial creado con plantilla React + TypeScript.
- Archivos `.tsx` presentes en `src/`.
- Configuración de Vite en TypeScript (`vite.config.ts`).
- Script del HTML apuntando a un archivo inexistente.

## Solución aplicada
- Eliminación de `App.tsx` y `main.tsx`.
- Creación de `App.jsx` y `main.jsx`.
- Actualización del script en `index.html`:
  ```html
  <script type="module" src="/src/main.jsx"></script>

