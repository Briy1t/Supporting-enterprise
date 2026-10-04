# Sanitización de texto con Bleach
## Decisión: Integrar bleach para limpiar texto de formularios.

## Motivación:  
Evitar inyección de HTML, scripts y contenido malicioso.

## Implementación:

```python
import bleach
clean_text = bleach.clean(text)
```