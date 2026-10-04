# INCIDENT LOG — React no funcionaba hasta reiniciar el ordenador

## Fecha
11/08/2026

## Descripción del incidente
React dejó de funcionar sin motivo aparente.  
El servidor iniciaba, pero el navegador no cargaba la aplicación.

## Síntomas
- React no renderizaba.
- Vite iniciaba pero no servía contenido.
- No había errores visibles en consola.
- El problema persistía incluso tras reinstalar dependencias.

## Causa raíz
Bloqueo temporal del sistema operativo (Windows) afectando:
- node.exe
- vite.exe
- puertos locales

## Solución aplicada
- Reiniciar el ordenador.
- React volvió a funcionar inmediatamente.

## Resultado
El frontend quedó operativo sin necesidad de cambios adicionales.
