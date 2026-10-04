# Arquitectura de Login Multiroles — Supporting Enterprise

La plataforma Supporting utiliza un sistema de acceso unificado basado en JWT y roles.  
Todos los usuarios (clientes, técnicos, administrativos, jefe) acceden mediante un único formulario de login.

## Flujo general
1. El usuario ingresa credenciales.
2. FastAPI valida la contraseña con bcrypt.
3. El backend devuelve:
   - token JWT
   - rol del usuario

## Redirección automática en React
- Cliente → /dashboard-cliente
- Técnico → /plataforma-empresarial/tecnicos
- Admin → /plataforma-empresarial/admin
- Jefe → acceso completo al panel empresarial

## Seguridad
Aunque el frontend oculte botones, FastAPI siempre valida el rol antes de permitir cualquier acción.

## Ventajas
- Arquitectura escalable.
- Permite añadir nuevos roles sin modificar la base.
- Separación clara entre Web Corporativa y Plataforma Empresarial.
