# INCIDENT LOG — Tablas no visibles entre usuarios PostgreSQL

## Fecha
05/08/2026

## Descripción del incidente
Las tablas creadas por el backend SUPPORTING no aparecían en DBeaver dentro del esquema `public`, a pesar de usar la misma URL de conexión.

## Síntomas
- Las tablas de la web (acceso_empresas, contactos, demo_guiada…) sí aparecían.
- Las tablas del backend (leads, alarmas, usuarios CRM…) no aparecían.
- En consola sí se podían consultar, pero no se mostraban en el esquema esperado.

## Causa raíz
PostgreSQL separa los objetos por usuario y esquema.

La web usa:
- Base: supporting_db  
- Usuario: postgres  
- Esquema: public  

El backend usa:
- Base: supporting_db  
- Usuario: supporting_user  
- Esquema: public  

Por lo tanto:
- Las tablas creadas por postgres NO son visibles para supporting_user.
- Las tablas creadas por supporting_user NO son visibles para postgres.

## Solución aplicada
- Verificar el usuario conectado en DBeaver.
- Conectar explícitamente con `supporting_user`.
- Revisar permisos del esquema `public`.
- Confirmar que Alembic está creando tablas bajo el usuario correcto.

## Resultado
Las tablas del backend se visualizaron correctamente al conectarse con el usuario adecuado.
