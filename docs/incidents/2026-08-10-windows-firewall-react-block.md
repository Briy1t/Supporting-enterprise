# INCIDENT LOG — React bloqueado por Firewall en Windows

## Fecha
10/08/2026

## Descripción del incidente
El frontend React no iniciaba correctamente en Windows debido a un bloqueo del firewall privado.

## Síntomas
- React no cargaba.
- Vite iniciaba pero el navegador no conectaba.
- Node.js bloqueado por firewall.
- Error persistente incluso tras reinstalar dependencias.

## Causa raíz
Windows Firewall bloqueaba:
- node.exe
- vite.exe
- tráfico local en puertos 5173 / 3000

## Solución aplicada
1. Permitir Node.js en firewall privado.
2. Permitir Vite en firewall privado.
3. Reiniciar adaptador de red.
4. Probar conexión en red “Probado”.
5. Mover el proyecto fuera de Desktop si persiste.

## Resultado
React volvió a funcionar correctamente.
