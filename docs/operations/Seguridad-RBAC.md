# Seguridad RBAC — Supporting Enterprise

La plataforma utiliza RBAC (Role-Based Access Control).

## Roles
- Cliente
- Técnico
- Administrativo
- Jefe / Superadmin

## Validación
- React bloquea vistas no autorizadas.
- FastAPI bloquea acciones no autorizadas.

## Ejemplo
Un técnico no puede acceder a /plataforma/admin.
Un cliente no puede acceder a /plataforma-empresarial.
