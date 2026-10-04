# Implementación de Rate Limiting
Decisión: Integrar slowapi en todas las rutas para limitar peticiones.

## Motivación:  
Evitar ataques de fuerza bruta, saturación (DoS) y abuso de endpoints.

## Implementación:

```bash

pip install slowapi

```
En cada router:

````python
from security import limiter
limiter.limit("5/minute")
```
