# INCIDENT LOG — Falta de dependencia react-router-dom

## Fecha
31/07/2026

## Descripción
El frontend no cargaba debido a que react-router-dom no estaba instalado.

## Síntomas
- Error en App.jsx
- Router no funcionaba
- Vite mostraba error de importación

## Causa raíz
Dependencia no instalada.

## Solución
npm install react-router-dom
npm run dev
