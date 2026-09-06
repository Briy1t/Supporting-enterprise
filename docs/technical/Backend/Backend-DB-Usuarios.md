# Usuarios PostgreSQL y Visibilidad de Tablas

PostgreSQL separa objetos por usuario y esquema.

## Web corporativa
Usuario: postgres  
Esquema: public  

## Backend SUPPORTING
Usuario: supporting_user  
Esquema: public  

## Consecuencia
Las tablas creadas por un usuario no son visibles para otro.

## Solución
- Conectar DBeaver con supporting_user.
- Revisar permisos del esquema public.
- Confirmar que Alembic crea tablas bajo supporting_user.
