# Hashing de Contraseñas — Supporting Enterprise

## Problema
bcrypt.hashpw devuelve bytes.

Si se guardan bytes en la base:
- bcrypt no puede validar
- el login falla
- aparece error de tipo

## Solución
Convertir bytes → string:

hashed = bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt())
hashed_str = hashed.decode("utf-8")
user.password = hashed_str

## Resultado
- Login estable
- Validación correcta
- Compatibilidad con Pydantic v2
