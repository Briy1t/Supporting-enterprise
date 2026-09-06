# INCIDENT LOG — Error de autenticación por contraseña almacenada como bytes

## Fecha
12/08/2026

## Descripción del incidente
El sistema generaba contraseñas correctamente, pero el login fallaba siempre.  
El hash almacenado en la base de datos no coincidía con el hash generado al validar.

## Síntomas
- Login siempre fallaba.
- bcrypt rechazaba la contraseña.
- El hash almacenado tenía formato:
  b'$2b$12$KJHkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjhkjh'

## Causa raíz
El hash se guardaba como **bytes**, no como **string**.

Ejemplo del error:

```codigo
hashed = bcrypt.hashpw(...)
user.password = hashed  # hashed es bytes
```

Luego, al validar:
user.password.encode("utf-8")  erro

## Solución aplicada
Convertir el hash a string antes de guardarlo:
```bash
hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
hashed_str = hashed.decode("utf-8")
user.password = hashed_str
```

## Resultado
- El login funciona correctamente.
- bcrypt valida sin errores.
- El sistema de autenticación quedó estable.